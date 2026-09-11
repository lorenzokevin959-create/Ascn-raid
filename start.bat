@echo off
title NULLIFY 1 - CONTROL PANEL
:top
cls
color 0C
echo ===================================================
echo           PROJECT NULLIFY // KEVIN DE LEON
echo ===================================================
echo [!] Cargando modulos y conectando...
node index.js
if %errorlevel% neq 0 (
    echo.
    echo [!] ERROR: El bot se detuvo. 
    echo [!] Revisa que el TOKEN sea valido en index.js.
    pause
)
goto top