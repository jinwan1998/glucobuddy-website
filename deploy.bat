@echo off
echo 🌐 GlucoBuddy Website Deployment
echo ================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git branch -M main
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Adding GitHub remote...
    echo Please enter your GitHub repository URL:
    echo Example: https://github.com/jinwan1998/glucobuddy-website.git
    set /p repo_url="Repository URL: "
    git remote add origin "%repo_url%"
)

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update GlucoBuddy website
git commit -m "%commit_msg%"

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Deployment completed!
echo.
echo 📋 Next steps:
echo 1. Go to your GitHub repository
echo 2. Click on 'Settings' tab
echo 3. Scroll down to 'Pages' section
echo 4. Set Source to 'GitHub Actions'
echo 5. Your site will be available at: https://jinwan1998.github.io/glucobuddy-website/
echo.
echo 🔄 The deployment may take a few minutes to complete.
echo Check the 'Actions' tab in your repository for deployment status.
echo.
pause
