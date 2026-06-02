# COMPILADOR E EXECUTOR - ESTUDO JAVA
# Use: .\compilar.ps1 ComecePorAqui
# Ou:  .\compilar.ps1 Fase1

param($Fase)

if (!$Fase) {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  COMPILADOR E EXECUTOR - ESTUDO JAVA                      ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host "`nCOMO USAR:" -ForegroundColor Yellow
    Write-Host "  .\compilar.ps1 ComecePorAqui" -ForegroundColor Green
    Write-Host "  .\compilar.ps1 Fase1" -ForegroundColor Green
    Write-Host "  .\compilar.ps1 Fase2" -ForegroundColor Green
    Write-Host "  .\compilar.ps1 Fase3" -ForegroundColor Green
    Write-Host "  .\compilar.ps1 Fase4" -ForegroundColor Green
    Write-Host "  .\compilar.ps1 Fase5" -ForegroundColor Green
    Write-Host "  .\compilar.ps1 Fase6" -ForegroundColor Green
    Write-Host "`nEXEMPLO:" -ForegroundColor Yellow
    Write-Host "  .\compilar.ps1 ComecePorAqui`n" -ForegroundColor Green
    exit
}

# Mapear entrada para nome de arquivo
$Mapa = @{
    'ComecePorAqui' = 'ComecePorAqui'
    'Fase1' = 'Fase1_Fundamentos'
    'Fase2' = 'Fase2_OOP'
    'Fase3' = 'Fase3_Colecoes'
    'Fase4' = 'Fase4_ExcecoesIO'
    'Fase5' = 'Fase5_StringsDatas'
    'Fase6' = 'Fase6_PadroesAvancados'
}

if ($Mapa.ContainsKey($Fase)) {
    $Arquivo = $Mapa[$Fase]
} else {
    Write-Host "❌ Fase inválida: $Fase" -ForegroundColor Red
    Show-Help
    exit 1
}

$Arquivo_java = "$Arquivo.java"

if (!(Test-Path $Arquivo_java)) {
    Write-Host "❌ Arquivo não encontrado: $Arquivo_java" -ForegroundColor Red
    exit 1
}

Write-Host "`n📝 Compilando $Arquivo_java..." -ForegroundColor Cyan
javac $Arquivo_java 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Compilação bem-sucedida!`n" -ForegroundColor Green
    Write-Host "🚀 Executando $Arquivo..." -ForegroundColor Cyan
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    java $Arquivo
} else {
    Write-Host "❌ Erro na compilação!" -ForegroundColor Red
    exit 1
}
