# Hawaii Tourism LOS Calculator - Standalone Version

This is a standalone version that works without Node.js or MongoDB. It loads data directly from the CSV file using JavaScript.

## How to Use

1. **Open in Browser:**
   - Simply open `index.html` in any modern web browser
   - Or use a local web server (recommended for proper file loading)

2. **Using Python's Built-in Server:**
   ```bash
   cd ~/hawaii-los-web/standalone
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser

3. **Using PHP's Built-in Server:**
   ```bash
   cd ~/hawaii-los-web/standalone
   php -S localhost:8000
   ```
   Then open http://localhost:8000 in your browser

## Files

- `index.html` - Main HTML page with embedded CSS
- `app.js` - JavaScript application logic
- `data.csv` - Hawaii Tourism data (1999-2021)

## Features

- No installation required (except for running a web server)
- All processing done in the browser
- Uses PapaParse library for CSV parsing
- Uses Chart.js for data visualization
- Fully responsive design

## External Dependencies

The following libraries are loaded from CDN:
- Chart.js 4.4.0 - for charts
- PapaParse 5.4.1 - for CSV parsing

## Browser Compatibility

Works with all modern browsers that support:
- ES6 JavaScript
- Fetch API
- Canvas API (for charts)

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Source

Hawaii Tourism Authority (via DBEDT Data Warehouse)
