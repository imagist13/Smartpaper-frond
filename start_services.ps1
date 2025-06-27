# SmartPaper服务启动脚本 (PowerShell版本)
Write-Host "Starting SmartPaper Services..." -ForegroundColor Green

# 设置路径
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendPath = Join-Path -Path $scriptPath -ChildPath "frond"
$backendPath = Join-Path -Path $scriptPath -ChildPath "SmartPaper"

# 初始化后端目录
Write-Host "Initializing backend directories..." -ForegroundColor Cyan
Set-Location -Path $backendPath
python init_dirs.py
Set-Location -Path $scriptPath

# 启动后端API服务
Write-Host "Starting backend API service..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "cd `"$backendPath`" && python api.py"

# 等待后端初始化
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 启动前端服务
Write-Host "Starting frontend service..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "cd `"$frontendPath`" && npm run dev"

Write-Host "Services started!" -ForegroundColor Green
Write-Host "Backend API: http://localhost:8000" -ForegroundColor Magenta
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Magenta 