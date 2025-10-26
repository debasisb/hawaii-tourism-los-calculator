const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const TourismData = require('../models/TourismData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hawaii_tourism';
const CSV_FILE = path.join(__dirname, '../../Downloads/Hawaii Tourism Data (from DBEDT Data Warehouse) (1).csv');

// Keywords to skip (footer rows)
const SKIP_KEYWORDS = [
  'Data is updated',
  'Source of Data',
  'Seasonally adjusted',
  'Hotel performance'
];

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await TourismData.deleteMany({});
    console.log('Cleared existing data');

    const records = [];

    // Read CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (row) => {
          const group = row.Group || '';

          // Skip footer/metadata rows
          if (!group || SKIP_KEYWORDS.some(keyword => group.includes(keyword))) {
            return;
          }

          const indicator = row.Indicator || '';
          const units = row.Units || 'days';

          // Extract yearly data
          const yearlyData = [];
          Object.keys(row).forEach(key => {
            // Check if key is a year (numeric)
            if (!isNaN(key) && row[key] && row[key].trim() !== '') {
              try {
                const value = parseFloat(row[key]);
                if (!isNaN(value)) {
                  yearlyData.push({
                    year: key,
                    value: value
                  });
                }
              } catch (e) {
                // Skip invalid values
              }
            }
          });

          if (yearlyData.length > 0) {
            records.push({
              group,
              indicator,
              units,
              yearlyData
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Insert records into MongoDB
    if (records.length > 0) {
      await TourismData.insertMany(records);
      console.log(`Successfully imported ${records.length} records`);
    } else {
      console.log('No records to import');
    }

    // Display summary
    const categories = await TourismData.distinct('group');
    const locations = await TourismData.distinct('indicator');

    console.log('\nImport Summary:');
    console.log(`- Total records: ${records.length}`);
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Locations: ${locations.length}`);

  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
}

importData();
