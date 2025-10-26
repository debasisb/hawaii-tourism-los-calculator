# GitHub Upload Instructions

Your code has been committed to git locally. Follow these steps to upload to GitHub:

## Method 1: Using GitHub Website (Recommended)

### Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name:** `hawaii-tourism-los-calculator`
   - **Description:** "Web application to calculate and visualize average length of stay for Hawaii tourism data"
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd ~/hawaii-los-web

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/hawaii-tourism-los-calculator.git

# Rename branch to main (if you prefer)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Method 2: Using GitHub CLI (If you want to install it)

### Install GitHub CLI

```bash
brew install gh
```

### Authenticate

```bash
gh auth login
```

Follow the prompts to authenticate with your GitHub account.

### Create Repository and Push

```bash
cd ~/hawaii-los-web

# Create repository on GitHub
gh repo create hawaii-tourism-los-calculator --public --source=. --remote=origin

# Push code
git push -u origin master
```

---

## Current Status

✓ Git repository initialized
✓ All files committed locally
✓ Ready to push to GitHub

### What's Been Committed

- 17 files including:
  - Full-stack version (Node.js + MongoDB)
  - Standalone version (pure JavaScript)
  - Complete documentation
  - Hawaii Tourism data (1999-2021)

### Repository Details

- **Local path:** ~/hawaii-los-web
- **Branch:** master
- **Files:** 17
- **Total changes:** 2,472 lines

---

## After Uploading

Once uploaded, your repository will be available at:
```
https://github.com/YOUR_USERNAME/hawaii-tourism-los-calculator
```

### Suggested Repository Topics

Add these topics to make your repo more discoverable:
- hawaii
- tourism
- data-visualization
- mongodb
- expressjs
- chartjs
- javascript
- web-application
- data-analysis

### Enable GitHub Pages (Optional)

To host the standalone version:

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main → /standalone
4. Save

Your app will be live at:
```
https://YOUR_USERNAME.github.io/hawaii-tourism-los-calculator/
```

---

## Troubleshooting

### Authentication Issues

If you get authentication errors, you may need to:

1. Create a Personal Access Token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Select scopes: repo, workflow
   - Copy the token

2. Use token when pushing:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/hawaii-tourism-los-calculator.git
   git push -u origin main
   ```

### Already Exists Error

If repository already exists, just add the remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hawaii-tourism-los-calculator.git
git push -u origin master
```

---

## Quick Commands Reference

```bash
# Check current status
git status

# View commit history
git log --oneline

# View remote
git remote -v

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin master

# Change branch name to main
git branch -M main
git push -u origin main
```

---

**Next Step:** Go to https://github.com/new and create your repository!
