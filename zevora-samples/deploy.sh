#!/usr/bin/env bash
set -euo pipefail

APP_NAME="zevora"
RELEASE_DIR="./dist"
TARGET_HOST="${DEPLOY_HOST:-deploy.example.com}"

log() {
  local level="$1"
  shift
  printf '[%s] %s\n' "$level" "$*"
}

build() {
  log INFO "building $APP_NAME"
  npm run build
}

if [[ ! -d "$RELEASE_DIR" ]]; then
  log ERROR "missing $RELEASE_DIR"
  exit 1
fi

build

for artifact in "$RELEASE_DIR"/*.tgz; do
  scp "$artifact" "$TARGET_HOST:/srv/apps/$APP_NAME/"
done

log INFO "deployed $(ls "$RELEASE_DIR" | wc -l) artifacts"
