#!/bin/sh
# Periodic gzipped logical backup of the Matomo database, with retention.
# Runs inside a mariadb:11.4 container (has `mariadb-dump`).
#
# Env (set by docker-compose):
#   DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
#   BACKUP_INTERVAL   seconds between dumps (default 86400 = daily)
#   BACKUP_KEEP_DAYS  delete dumps older than N days (default 14)
set -eu

: "${BACKUP_INTERVAL:=86400}"
: "${BACKUP_KEEP_DAYS:=14}"
BACKUP_DIR=/backups

# Pass the password via the environment, not the command line, so it does
# not leak through `ps`.
export MYSQL_PWD="$DB_PASSWORD"

mkdir -p "$BACKUP_DIR"

echo "[backup] starting: every ${BACKUP_INTERVAL}s, keeping ${BACKUP_KEEP_DAYS} days"

while true; do
  ts=$(date +%Y%m%d-%H%M%S)
  target="${BACKUP_DIR}/matomo-${ts}.sql.gz"
  tmp="${target}.tmp"

  echo "[backup] $(date -u +%FT%TZ) dumping ${DB_NAME} -> ${target}"
  if mariadb-dump \
        --host="$DB_HOST" \
        --user="$DB_USER" \
        --single-transaction \
        --quick \
        --routines \
        --events \
        "$DB_NAME" | gzip -9 > "$tmp"; then
    mv "$tmp" "$target"
    echo "[backup] ok: $(du -h "$target" | cut -f1)"
  else
    echo "[backup] FAILED, discarding partial file" >&2
    rm -f "$tmp"
  fi

  # Retention: prune old dumps.
  find "$BACKUP_DIR" -name 'matomo-*.sql.gz' -type f -mtime +"$BACKUP_KEEP_DAYS" -delete

  sleep "$BACKUP_INTERVAL"
done
