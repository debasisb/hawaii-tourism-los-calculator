# Hawaii Tourism Length of Stay Calculator

A web application to calculate and visualize average length of stay for Hawaii tourism data using MongoDB, Express.js, and vanilla JavaScript.

## Features

- Interactive web form to select visitor categories and locations
- Real-time calculation of average length of stay statistics
- Beautiful data visualizations with Chart.js
- RESTful API backend with MongoDB database
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- CSV data file: `Hawaii Tourism Data (from DBEDT Data Warehouse) (1).csv`

## Installation

1. Install dependencies:
```bash
cd hawaii-los-web
npm install
```

2. Make sure MongoDB is running:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod
```

3. Import the CSV data into MongoDB:
```bash
npm run import
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Use the web form to:
   - Select a visitor category (e.g., "All visitors by air")
   - Optionally select a specific location (or leave blank for all locations)
   - Click "Calculate" to see results

## API Endpoints

### GET /api/categories
Returns all available visitor categories.

### GET /api/locations
Returns all available locations.

### POST /api/calculate
Calculate average length of stay.

**Request Body:**
```json
{
  "category": "All visitors by air",
  "location": "LOS Statewide"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "All visitors by air",
    "location": "LOS Statewide",
    "statistics": {
      "average": 9.26,
      "min": {
        "value": 8.8,
        "year": "2019",
        "location": "LOS Statewide"
      },
      "max": {
        "value": 10.6,
        "year": "2020",
        "location": "LOS Statewide"
      },
      "dataPoints": 23
    },
    "chartData": [...]
  }
}
```

## Project Structure

```
hawaii-los-web/
├── models/
│   └── TourismData.js      # MongoDB schema
├── routes/
│   └── api.js              # API routes
├── public/
│   ├── index.html          # Main HTML page
│   ├── styles.css          # Styles
│   └── app.js              # Frontend JavaScript
├── scripts/
│   └── importData.js       # CSV import script
├── server.js               # Express server
├── package.json
├── .env                    # Environment variables
└── README.md
```

## Available Categories

- All visitors by air
- Hotel-only visitors
- First-time visitors
- Honeymoon visitors
- Condo-only visitors
- Repeat visitors
- Get-married visitors
- Timeshare-only visitors
- MCI visitors
- Rental house visitors
- B&B visitors
- Family visitors
- Visiting Friends/Relatives

## Available Locations

- LOS Statewide
- LOS on Oahu
- LOS on Maui
- LOS on Molokai
- LOS on Lanai
- LOS on Kauai
- LOS on Hawaii Island
- LOS in Hilo
- LOS in Kona

## Data Source

Hawaii Tourism Authority (via DBEDT Data Warehouse)
Data covers years 1999-2021

## Development

For development with auto-reload:
```bash
npm run dev
```

## License

ISC
