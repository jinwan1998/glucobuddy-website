#!/bin/bash

# 🚀 GlucoBuddy Website Deployment Script
# This script helps deploy the website to GitHub Pages

echo "🌐 GlucoBuddy Website Deployment"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git branch -M main
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding GitHub remote..."
    echo "Please enter your GitHub repository URL:"
    echo "Example: https://github.com/jinwan1998/glucobuddy-website.git"
    read -p "Repository URL: " repo_url
    git remote add origin "$repo_url"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update GlucoBuddy website"
fi
git commit -m "$commit_msg"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Set Source to 'GitHub Actions'"
echo "5. Your site will be available at: https://jinwan1998.github.io/glucobuddy-website/"
echo ""
echo "🔄 The deployment may take a few minutes to complete."
echo "Check the 'Actions' tab in your repository for deployment status."
