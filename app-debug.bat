@echo off
setlocal enabledelayedexpansion

set IP=192.168.15.39
set PORT=5555
set DEVICE=0087847775
set running=false

:inicio
:: Verifica se o dispositivo aparece
adb devices | findstr /i "%IP%:%PORT%" > nul
if %errorlevel% neq 0 (
    if "%running%"=="true" (
        echo Dispositivo desconectado. Tentando reconectar...

        set running=false
    )

    adb kill-server
    adb start-server
    adb connect %IP%:%PORT%
) else (
    if "%running%"=="false" (
        echo Dispositivo conectado. Rodando o app...

        start "" /b cmd /c "ionic cap run android -l --target %IP%:%PORT% --host 0.0.0.0 --public-host 192.168.15.43"
        
        set running=true

        :: Abrir automaticamente a aba do Chrome DevTools
        start chrome
	echo Abra na página:      chrome://inspect/#devices
    )
)

timeout /t 1 > nul
goto inicio
