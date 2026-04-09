# Team Docker Setup

Use one of the scripts below to standardize Linux and Windows setup.

## Linux

1. Install Docker Engine + Docker Compose plugin.
2. Run:

bash ./scripts/setup-linux-docker.sh

## Windows (PowerShell)

1. Install Docker Desktop and enable WSL2 backend.
2. Open PowerShell in project folder.
3. Run:

./scripts/setup-windows-docker.ps1

## URLs

- Web: http://localhost:5173
- Backend: http://localhost:3000
- PgAdmin: http://localhost:5050

## Useful commands

- Start: npm run docker:up
- Logs: npm run docker:logs
- Stop: npm run docker:down
- Clean volumes: npm run docker:clean
