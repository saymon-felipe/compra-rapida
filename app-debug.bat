@echo off
setlocal enabledelayedexpansion

set IP=192.168.15.39
set PORT=5555
set DEVICE=%IP%:%PORT%
set running=false
set PID_APP=0

:inicio
:: Verifica se o dispositivo aparece
adb devices | findstr /i "%DEVICE%" > nul
if %errorlevel% neq 0 (
    if "%running%"=="true" (
        echo Dispositivo desconectado. Tentando reconectar...

        if not "%PID_APP%"=="0" (
            taskkill /PID %PID_APP% /F > nul 2>&1
            set PID_APP=0
        )

        set running=false
    )

    adb kill-server
    adb start-server
    timeout /t 2 > nul
    adb connect %IP%:%PORT%
    timeout /t 5 > nul
) else (
    if "%running%"=="false" (
        echo Dispositivo conectado. Rodando o app...

        start "" /b cmd /c "ionic cap run android -l --target %DEVICE% --host 0.0.0.0 --public-host 192.168.15.43"
        
        timeout /t 3 > nul

        for /f "tokens=2 delims==;" %%p in ('wmic process where "CommandLine like '%%ionic cap run%%'" get ProcessId /value') do (
            set PID_APP=%%p
        )

        echo PID do app: !PID_APP!

        set running=true

        :: Abrir automaticamente a aba do Chrome DevTools
        start chrome
	echo Abra na página:      chrome://inspect/#devices
    )
)

timeout /t 5 > nul
goto inicio
