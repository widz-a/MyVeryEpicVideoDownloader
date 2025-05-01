@echo off
title Some NS Shits
color 0A

:MENU
cls
echo ==========================
echo     Choose an Option
echo ==========================
echo 1. Run NativeScript App (Android)
echo 2. Clean Project
echo 3. Generate Icons
echo 4. Exit
echo ==========================
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" goto RUN
if "%choice%"=="2" goto CLEAN
if "%choice%"=="3" goto ICONS
if "%choice%"=="4" exit
goto MENU

:RUN
echo Running app...
ns run android
pause
goto MENU

:CLEAN
echo Cleaning project...
ns clean
pause
goto MENU

:ICONS
echo Generating icons...
ns resources generate icons ./icon.png
pause
goto MENU