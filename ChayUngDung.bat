@echo off
echo ========================================
echo   QUAN LY QUAN CAFE - Khoi dong server
echo ========================================
echo.
echo Dang khoi dong Backend tai http://localhost:5000 ...
echo Nhan Ctrl+C de tat server.
echo.
cd /d "%~dp0Backend"
dotnet run
