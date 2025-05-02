@echo off
title Some NS Shits

:MENU
cls
echo ==========================
echo     Choose an Option
echo ==========================
echo 1. Preview NativeScript App
echo 2. Run Project (Android)
echo 3. Build Project (Android)
echo 4. Generate Icons
echo 5. Exit
echo ==========================
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" goto PREVIEW
if "%choice%"=="2" goto RUN
if "%choice%"=="3" goto BUILD
if "%choice%"=="4" goto ICONS
if "%choice%"=="5" exit
goto MENU

:PREVIEW
echo Running app preview...
ns preview
pause
goto MENU

:RUN
echo Running app...
ns run android --bundle --env.uglify --env.aot --env.snapshot
pause
goto MENU

:BUILD
echo Building project...
ns build android --bundle --env.uglify --env.aot --env.snapshot
pause
goto MENU

:ICONS
echo Generating icons...
ns resources generate icons ./icon.png
pause
goto MENU