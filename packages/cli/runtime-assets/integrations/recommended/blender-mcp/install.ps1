$ErrorActionPreference = "Stop"
$Manifest = Get-Content -Raw (Join-Path $PSScriptRoot "manifest.json") | ConvertFrom-Json
Write-Host "Installing $($Manifest.name)..."
if (-not (Get-Command uvx -ErrorAction SilentlyContinue)) {
    Write-Warning "uvx is not installed. Please install uv (powershell -c ""irm https://astral.sh/uv/install.ps1 | iex"") or via pip install uv."
} else {
    & uvx mcp-for-blender install-addon 2>$null
}
Write-Host "$($Manifest.name) ready"
