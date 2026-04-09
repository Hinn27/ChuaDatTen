#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[1/5] Checking Docker availability..."
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not in PATH."
  echo "Install Docker first, then rerun this script."
  echo "Ubuntu/Debian quick start: https://docs.docker.com/engine/install/ubuntu/"
  exit 1
fi

echo "[2/5] Checking Docker Compose plugin..."
if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose plugin is missing."
  echo "Install guide: https://docs.docker.com/compose/install/linux/"
  exit 1
fi

echo "[2.5/5] Checking Docker daemon access..."
if ! docker info >/dev/null 2>&1; then
  echo "Cannot access Docker daemon (permission denied on /var/run/docker.sock)."
  echo "Fix with:"
  echo "  sudo usermod -aG docker $USER"
  echo "Then re-login (or run: newgrp docker) and execute setup again."
  echo "Temporary workaround: run this script with sudo."
  exit 1
fi

echo "[3/5] Preparing .env..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
else
  echo ".env already exists, keeping current values"
fi

echo "[4/5] Starting containers..."
docker compose up --build -d

echo "[5/5] Current service status:"
docker compose ps

echo ""
echo "Done. Open:"
echo "- Web: http://localhost:5173"
echo "- Backend: http://localhost:3000"
echo "- PgAdmin: http://localhost:5050"
