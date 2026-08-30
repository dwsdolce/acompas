#!/usr/bin/env bash
# Regenerate EVERY icon, including the Capacitor Android/iOS assets that are
# committed to the repo. Run this only when app-icon.png changes, and review
# the resulting diff — it rewrites ~30 tracked binaries.
#
# The generated-but-gitignored icons (public/icons, public/favicon.ico,
# src-electron/electron-assets) are handled automatically by the postinstall
# hook via `yarn icons`; you do not need to run this for a normal build.
set -e
npx icongenie generate -p icongenie-profile.json
