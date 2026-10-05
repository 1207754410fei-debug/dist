@echo off
chcp 65001 >nul
title 严毅飞 YAN YIFEI — 作品集本地预览
setlocal
set "HERE=%~dp0"
set "RT=%HERE%tools\runtime"
set "NPM=npm"

if exist "%RT%\node.exe" (
  set "PATH=%RT%;%PATH%"
  set "NPM=%RT%\npm.cmd"
) else (
  where node >nul 2>nul
  if errorlevel 1 (
    echo.
    echo   [ x ] 没有找到 Node.js。
    echo   请先到 https://nodejs.org/ 安装 LTS 版本，或把免安装版放到 tools\runtime\ 目录。
    echo.
    pause
    exit /b 1
  )
)

cd /d "%HERE%"

if not exist "node_modules\" (
  echo.
  echo   首次运行，正在安装依赖，大约需要 1-2 分钟...
  echo.
  call "%NPM%" install
  if errorlevel 1 (
    echo.
    echo   依赖安装失败，请检查网络后重试。
    pause
    exit /b 1
  )
)

echo.
echo   ============================================
echo    严毅飞 YAN YIFEI - 品牌设计师作品集
echo   ============================================
echo.
echo   本地地址: http://127.0.0.1:5173
echo   浏览器将在几秒后自动打开。
echo   关闭这个窗口即可停止服务。
echo.

start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 5; Start-Process 'http://127.0.0.1:5173'"

call "%NPM%" run dev

echo.
echo   服务已停止。
pause
