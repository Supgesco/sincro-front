@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  COMPILADOR E EXECUTOR DE FASES - ESTUDO JAVA             ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

if "%1"=="" (
    echo COMO USAR:
    echo   compilar.bat ComecePorAqui
    echo   compilar.bat Fase1
    echo   compilar.bat Fase2
    echo   compilar.bat Fase3
    echo   compilar.bat Fase4
    echo   compilar.bat Fase5
    echo   compilar.bat Fase6
    echo.
    echo EXEMPLO:
    echo   compilar.bat ComecePorAqui
    exit /b
)

set ARQUIVO=%1_Fundamentos
if "%1"=="ComecePorAqui" set ARQUIVO=ComecePorAqui
if "%1"=="Fase1" set ARQUIVO=Fase1_Fundamentos
if "%1"=="Fase2" set ARQUIVO=Fase2_OOP
if "%1"=="Fase3" set ARQUIVO=Fase3_Colecoes
if "%1"=="Fase4" set ARQUIVO=Fase4_ExcecoesIO
if "%1"=="Fase5" set ARQUIVO=Fase5_StringsDatas
if "%1"=="Fase6" set ARQUIVO=Fase6_PadroesAvancados

if not exist "%ARQUIVO%.java" (
    echo ❌ Arquivo não encontrado: %ARQUIVO%.java
    exit /b 1
)

echo 📝 Compilando %ARQUIVO%.java...
javac "%ARQUIVO%.java" 2>&1

if %ERRORLEVEL% equ 0 (
    echo ✅ Compilação bem-sucedida!
    echo.
    echo 🚀 Executando %ARQUIVO%...
    echo ════════════════════════════════════════════════════════════
    echo.
    java "%ARQUIVO%"
) else (
    echo ❌ Erro na compilação!
    exit /b 1
)
