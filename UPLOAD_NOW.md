# Upload to GitHub for @debasisb

## Quick Upload (Choose One Method)

### Method 1: Create Repository First (Recommended)

**Step 1:** Go to https://github.com/new and create a new repository
- Name: `hawaii-tourism-los-calculator`
- Public
- **Do NOT check** "Add README file"
- Click "Create repository"

**Step 2:** After creating, GitHub will show you commands. Use these:

```bash
cd ~/hawaii-los-web

# If you created with HTTPS URL:
git remote remove origin
git remote add origin https://github.com/debasisb/hawaii-tourism-los-calculator.git
git branch -M main
git push -u origin main
```

When prompted for username/password:
- Username: `debasisb`
- Password: Use a **Personal Access Token** (not your regular password)

**Step 3:** Get Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "hawaii-los-upload"
4. Select scopes: ✓ repo
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)
7. Use this token as your password when pushing

---

### Method 2: Create SSH Key (For Future Pushes)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "debasisb@hawaii.edu"

# Press Enter for default location
# Press Enter for no passphrase (or set one)

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

**Add to GitHub:**
1. Go to: https://github.com/settings/ssh/new
2. Paste your public key
3. Click "Add SSH key"

**Update remote to use SSH:**
```bash
cd ~/hawaii-los-web
git remote remove origin
git remote add origin git@github.com:debasisb/hawaii-tourism-los-calculator.git
git branch -M main
git push -u origin main
```

---

### Method 3: Use GitHub Desktop (GUI)

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Choose: `/Users/debasisbhattacharya/hawaii-los-web`
5. Click "Publish repository"
6. Name: `hawaii-tourism-los-calculator`
7. Click "Publish Repository"

---

## Current Status

✓ Repository initialized locally
✓ Files committed (17 files)
✓ Remote added: https://github.com/debasisb/hawaii-tourism-los-calculator.git
✓ Branch renamed to main
⚠️ Waiting for authentication to push

---

## What Will Be Uploaded

```
hawaii-tourism-los-calculator/
├── standalone/          # Standalone web app
│   ├── index.html
│   ├── app.js
│   └── data.csv
├── public/              # Frontend files
├── models/              # MongoDB schemas
├── routes/              # API routes
├── server.js            # Express server
├── package.json         # Dependencies
└── [Documentation files]
```

**Total:** 17 files, 2,472 lines of code

---

## Repository Will Be At

```
https://github.com/debasisb/hawaii-tourism-los-calculator
```

---

## After Upload

### View Your Repository
Visit: https://github.com/debasisb/hawaii-tourism-los-calculator

### Enable GitHub Pages (Optional)
1. Settings → Pages
2. Source: main branch → /standalone folder
3. Save
4. Live at: https://debasisb.github.io/hawaii-tourism-los-calculator/

### Clone on Another Machine
```bash
git clone https://github.com/debasisb/hawaii-tourism-los-calculator.git
```

---

## Need Help?

**Create Personal Access Token:**
https://github.com/settings/tokens/new

**GitHub SSH Setup:**
https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**Questions?**
Check GITHUB_INSTRUCTIONS.md for more details.

---

**Recommended:** Use Method 1 with a Personal Access Token for quick upload!
