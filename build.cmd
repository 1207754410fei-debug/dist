@echo off
chcp 65001 >nul
title 严毅飞 YAN YIFEI — 打包静态文件
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
    echo   [ x ] 没有找到 Node.js。请先安装 Node.js LTS：https://nodejs.org/
    echo.
    pause
    exit /b 1
  )
)

cd /d "%HERE%"

if not exist "node_modules\" (
  echo   正在安装依赖...
  call "%NPM%" install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

call "%NPM%" run build
if errorlevel 1 (
  echo.
  echo   打包失败，请查看上面的错误信息。
  pause
  exit /b 1
)

echo.
echo   打包完成，静态文件在 dist 文件夹里。
echo   可以直接双击 dist\index.html 查看，也可以把整个 dist 上传到任意静态空间。
echo.
pause
