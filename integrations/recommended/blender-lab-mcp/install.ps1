$ErrorActionPreference = "Stop"
$Manifest = Get-Content -Raw (Join-Path $PSScriptRoot "manifest.json") | ConvertFrom-Json
Write-Host "Configuring $($Manifest.name)..."
Write-Host "$($Manifest.name) ready"
