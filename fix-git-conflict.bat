@echo off
echo 🔧 Git Conflict Resolution Tool
echo ===============================
echo.

echo 🔍 Checking current Git status...
git status

echo.
echo 📋 Available solutions:
echo 1. Merge remote changes (recommended)
echo 2. Force push (overwrites remote)
echo 3. Reset and start fresh
echo 4. Exit
echo.

set /p choice="Choose option (1-4): "

if "%choice%"=="1" goto merge
if "%choice%"=="2" goto force
if "%choice%"=="3" goto reset
if "%choice%"=="4" goto exit

:merge
echo.
echo 🔄 Attempting to merge remote changes...
git pull origin main --allow-unrelated-histories
if errorlevel 1 (
    echo.
    echo ⚠️  Merge conflicts detected!
    echo 📝 Please resolve conflicts manually:
    echo 1. Open conflicted files in your editor
    echo 2. Look for ^^^<<<<<<<, =======, ^^^^^^>>>>>>> markers
    echo 3. Choose which changes to keep
    echo 4. Remove the conflict markers
    echo 5. Run: git add .
    echo 6. Run: git commit -m "Resolve merge conflicts"
    echo 7. Run: git push origin main
    echo.
    pause
    goto exit
)

echo ✅ Merge successful! Now pushing...
git push -u origin main
if errorlevel 1 (
    echo ❌ Push still failed. Try force push option.
    pause
    goto exit
)
echo ✅ Successfully pushed to GitHub!
goto success

:force
echo.
echo ⚠️  WARNING: This will overwrite the remote repository!
echo 📝 This will delete any files that exist on GitHub but not locally.
set /p confirm="Are you sure? (y/N): "
if /i not "%confirm%"=="y" goto exit

echo 🚀 Force pushing to GitHub...
git push -u origin main --force
if errorlevel 1 (
    echo ❌ Force push failed. Check your credentials and repository URL.
    pause
    goto exit
)
echo ✅ Force push successful!
goto success

:reset
echo.
echo 🔄 Resetting Git configuration...
echo ⚠️  This will remove the current remote and re-add it.

git remote remove origin
git remote add origin https://github.com/jinwan1998/glucobuddy-website.git

echo 📥 Fetching remote repository...
git fetch origin

echo 🔄 Attempting to merge...
git merge origin/main --allow-unrelated-histories
if errorlevel 1 (
    echo ❌ Merge failed. You may need to resolve conflicts manually.
    pause
    goto exit
)

echo 🚀 Pushing to GitHub...
git push -u origin main
if errorlevel 1 (
    echo ❌ Push failed. Try the force push option.
    pause
    goto exit
)
echo ✅ Reset and push successful!
goto success

:success
echo.
echo 🎉 SUCCESS! Your website has been deployed to GitHub Pages!
echo.
echo 📋 Next steps:
echo 1. Go to: https://github.com/jinwan1998/glucobuddy-website
echo 2. Click on 'Settings' tab
echo 3. Scroll to 'Pages' section
echo 4. Set Source to 'GitHub Actions'
echo 5. Your site will be available at: https://jinwan1998.github.io/glucobuddy-website/
echo.
echo 🔄 Deployment may take 2-5 minutes to complete.
echo Check the 'Actions' tab for deployment status.
goto exit

:exit
echo.
echo 👋 Exiting Git conflict resolution tool.
pause
