# Production deployment (Debian + Docker)

Stack: **Traefik** (TLS/Let's Encrypt) → **nginx** (the A Compás SPA) +
**Matomo** analytics with its **MariaDB** and an automated **daily backup**.

```
                    ┌────────────┐
  acompas.org ─────▶│            │──▶ app (nginx : dist/spa)
  www.acompas.org   │  Traefik   │
  piwik.acompas.org│ 80/443 TLS │──▶ matomo ──▶ matomo-db ──▶ matomo-db-backup
                    └────────────┘        (matomo_internal network)
```

## 0. Prerequisites on the server

- A Debian server with a public IP.
- Docker Engine + Compose plugin:
  ```bash
  curl -fsSL https://get.docker.com | sh
  ```
- **DNS A/AAAA records** pointing to the server for all three hostnames:
  `acompas.org`, `www.acompas.org`, `piwik.acompas.org`.
- Ports **80** and **443** open (Let's Encrypt HTTP-01 challenge needs 80).

## 1. Build the SPA (on your machine / CI)

Only the built static site is deployed — no Node.js needed on the server.

```bash
# from the repo root
quasar build            # outputs dist/spa
```

## 2. Copy the necessary files to the server

Transfer just this `deploy/` folder plus the built SPA into it as `spa/`:

```bash
# the built site -> deploy/spa (trailing slashes matter; excludes junk)
rsync -av --delete --exclude '.DS_Store' dist/spa/ user@server:/opt/acompas/spa/

# the deploy folder (compose, nginx conf, backup script)
rsync -av --exclude '.env' --exclude 'spa' --exclude 'backups' \
      deploy/ user@server:/opt/acompas/
```

Resulting layout on the server:

```
/opt/acompas/
├── docker-compose.yml
├── .env                # you create this (step 3)
├── nginx.conf
├── backup/backup.sh
├── spa/                # the built site (index.html, assets/, audio/, …)
└── backups/            # created automatically, holds the DB dumps
```

## 3. Configure secrets

```bash
cd /opt/acompas
cp .env.example .env
# edit .env: set ACME_EMAIL and strong DB passwords
#   openssl rand -base64 24   # handy for passwords
```

## 4. Start the stack

```bash
docker compose up -d
docker compose logs -f traefik   # watch the certificates being issued
```

First TLS issuance takes a few seconds per host. If it fails, check that DNS
resolves to this server and that port 80 is reachable.

## 5. Finish the Matomo install

Open `https://piwik.acompas.org` and follow the web installer. The database
settings are already injected via env, so accept them. Create your admin user
and the first website (`acompas.org`).

### Matomo behind the reverse proxy

Matomo terminates behind Traefik, so after install, add this to
`matomo_app` volume's `config/config.ini.php` (edit inside the container:
`docker compose exec matomo bash`) so it trusts the proxy and detects HTTPS:

```ini
[General]
trusted_hosts[] = "piwik.acompas.org"
assume_secure_protocol = 1
proxy_client_headers[] = "HTTP_X_FORWARDED_FOR"
proxy_host_headers[] = "HTTP_X_FORWARDED_HOST"
```

The app already tracks to this host — see `src/composables/matomo.ts`
(`https://piwik.acompas.org/`, site id 1), gated by user consent
(`sessionStore.trackingEnabled`). So the first website you create in the
installer must be site id 1 and match `acompas.org`. Nothing to add on the
app side unless you change that URL.

## 6. Updating the site later

Rebuild and re-sync `spa/`; nginx serves the files live, no restart needed:

```bash
quasar build
rsync -av --delete --exclude '.DS_Store' dist/spa/ user@server:/opt/acompas/spa/
```

(Optionally `docker compose restart app` to flush nginx's open handles.)

## Backups

`matomo-db-backup` writes `backups/matomo-YYYYmmdd-HHMMSS.sql.gz` on the
interval set by `BACKUP_INTERVAL` (default daily) and prunes files older than
`BACKUP_KEEP_DAYS` (default 14).

- **Verify:** `ls -lh /opt/acompas/backups`
- **Off-site copy (recommended):** rsync `backups/` to another host, e.g. a cron
  on your workstation. Backups on the same server do not protect against server
  loss.
- **Restore:**
  ```bash
  gunzip < backups/matomo-XXXX.sql.gz \
    | docker compose exec -T matomo-db \
        mariadb -u root -p"$MATOMO_DB_ROOT_PASSWORD" matomo
  ```

## Notes

- The Traefik dashboard/API is intentionally disabled. Don't add
  `--api.insecure=true` on a public server.
- `.env`, `spa/` and `backups/` are git-ignored — they are runtime data, not
  source.
