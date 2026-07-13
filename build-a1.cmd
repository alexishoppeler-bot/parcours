@echo off
setlocal
cd /d "%~dp0"
node qa\sync-content-pack.js content\pack-cecrl-a1.json
if errorlevel 1 exit /b %errorlevel%
node qa\validate-content.js
if errorlevel 1 exit /b %errorlevel%
node qa\test-games-cdp.js
exit /b %errorlevel%
