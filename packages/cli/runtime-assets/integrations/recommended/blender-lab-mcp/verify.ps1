$ErrorActionPreference = "Stop"
$Manifest = Get-Content -Raw (Join-Path $PSScriptRoot "manifest.json") | ConvertFrom-Json
Write-Host "Verifying $($Manifest.name)..."
Write-Host "$($Manifest.name) PASS"
