#!/usr/bin/env bash

# Build the web application
npm run build

# Checkout the "gh-pages" branch
git checkout -b gh-pages

# move files to build folder
mv public/images ./build
mv public/joystick ./build
mv public/joystick.html ./build
mv public/joystick-dev.html ./build
mv public/line-tracking.html ./build

# Remove all files from the current directory, except for ".git"
find . -maxdepth 1 ! -name '.git' ! -name 'build' ! -name '.gitignore' ! -name 'node_modules' -exec rm -rf {} \;

# Move all files in build up one level
mv build/* .

# delete build folder
rmdir build

# Add all files to the staging area
git add .

# Commit the changes
git commit -m "Deploy to Github Pages"

# Push the "gh-pages" branch to Github
git push origin gh-pages

# Switch back to the original branch
git checkout -

# delete gh-pages branch
git branch -D gh-pages
