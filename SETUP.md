# Setup Instructions

## Option 1: Full Stack Application (Requires Node.js and MongoDB)

### Prerequisites
You need to install Node.js and MongoDB first.

### Install Node.js
Visit https://nodejs.org/ and download the LTS version for macOS, or install via Homebrew:
```bash
brew install node
```

### Install MongoDB
```bash
brew tap mongodb/brew
brew install mongodb-community
```

### Start MongoDB
```bash
brew services start mongodb-community
```

### Install Project Dependencies
```bash
cd hawaii-los-web
npm install
```

### Import Data
```bash
npm run import
```

### Start the Server
```bash
npm start
```

### Access the Application
Open http://localhost:3000 in your browser

---

## Option 2: Standalone Version (No Installation Required)

A standalone HTML version is available in the `standalone/` folder that works without Node.js or MongoDB. It loads the data directly from the CSV file using JavaScript.

See `standalone/README.md` for details.

---

## Troubleshooting

### Node.js not found
Make sure Node.js is installed and in your PATH:
```bash
which node
node --version
```

### MongoDB connection error
Make sure MongoDB is running:
```bash
brew services list | grep mongodb
```

### Port 3000 already in use
Change the PORT in the `.env` file to a different port number.
