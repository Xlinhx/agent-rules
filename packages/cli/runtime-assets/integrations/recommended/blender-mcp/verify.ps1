$ErrorActionPreference = "Stop"
$Manifest = Get-Content -Raw (Join-Path $PSScriptRoot "manifest.json") | ConvertFrom-Json
Write-Host "Verifying $($Manifest.name)..."
if (-not (Get-Command uvx -ErrorAction SilentlyContinue)) {
    throw "Health check failed: uvx executable not found in PATH"
}
$Output = & uvx mcp-for-blender --help 2>&1
if ($LASTEXITCODE -ne 0) { throw "Health check failed: $Output" }
Write-Host "$($Manifest.name) PASS"
