@echo off
echo Starting SmartPaper Services...

:: Set paths
set FRONTEND_PATH=%~dp0frond
set BACKEND_PATH=%~dp0SmartPaper

:: Initialize directories for backend
echo Initializing backend directories...
cd /d "%BACKEND_PATH%" 
python init_dirs.py
cd /d "%~dp0"

:: Start backend API service
echo Starting backend API service...
start cmd /k "cd /d "%BACKEND_PATH%" && python api.py"

:: Wait a moment for backend to initialize
timeout /t 5

:: Start frontend service
echo Starting frontend service...
start cmd /k "cd /d "%FRONTEND_PATH%" && npm run dev"

echo Services started!
echo Backend API: http://localhost:8000
echo Frontend: http://localhost:5173 