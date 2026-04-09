$ErrorActionPreference = "Stop"

Write-Host "[1/5] Checking Docker Desktop..."
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host "Docker command not found. Install Docker Desktop first:" -ForegroundColor Red
  Write-Host "https://docs.docker.com/desktop/setup/install/windows-install/"
  exit 1
}

Write-Host "[2/5] Checking Docker Compose..."
try {
  docker compose version | Out-Null
} catch {
  Write-Host "Docker Compose plugin is not available in Docker Desktop." -ForegroundColor Red
  exit 1
}

Write-Host "[3/5] Preparing .env..."
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example"
} else {
  Write-Host ".env already exists, keeping current values"
}

Write-Host "[4/5] Starting containers..."
docker compose up --build -d

Write-Host "[5/5] Current service status:"
docker compose ps

Write-Host ""
Write-Host "Done. Open:" -ForegroundColor Green
Write-Host "- Web: http://localhost:5173"
Write-Host "- Backend: http://localhost:3000"
Write-Host "- PgAdmin: http://localhost:5050"
