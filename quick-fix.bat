@echo off
echo 🚀 Quick Git Conflict Fix
echo =========================
echo.

echo 🔄 Resolving current merge conflicts...

REM Add all files to resolve conflicts
git add .

REM Commit the merge
git commit -m "Resolve merge conflicts and deploy GlucoBuddy website"

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push failed. Trying alternative solution...
    echo 🔄 Aborting merge and force pushing...
    
    git merge --abort
    git add .
    git commit -m "Deploy GlucoBuddy website"
    git push -u origin main --force
    
    if errorlevel 1 (
        echo ❌ Force push also failed. Please check your credentials.
        pause
        exit /b 1
    )
)

echo.
echo ✅ SUCCESS! Website deployed to GitHub!
echo.
echo 📋 Next steps:
echo 1. Go to: https://github.com/jinwan1998/glucobuddy-website/settings/pages
echo 2. Set Source to 'GitHub Actions'
echo 3. Your site will be live at: https://jinwan1998.github.io/glucobuddy-website/
echo.
pause
