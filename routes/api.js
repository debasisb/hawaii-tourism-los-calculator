const express = require('express');
const router = express.Router();
const TourismData = require('../models/TourismData');

// Get all unique categories (groups)
router.get('/categories', async (req, res) => {
  try {
    const categories = await TourismData.distinct('group');
    res.json({ success: true, data: categories.sort() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all unique locations (indicators)
router.get('/locations', async (req, res) => {
  try {
    const locations = await TourismData.distinct('indicator');
    res.json({ success: true, data: locations.sort() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Calculate average length of stay
router.post('/calculate', async (req, res) => {
  try {
    const { category, location } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    // Build query
    const query = { group: category };
    if (location) {
      query.indicator = location;
    }

    // Find matching records
    const records = await TourismData.find(query);

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No data found for the specified criteria'
      });
    }

    // Collect all values
    const allValues = [];
    records.forEach(record => {
      record.yearlyData.forEach(yearData => {
        allValues.push({
          year: yearData.year,
          value: yearData.value,
          location: record.indicator
        });
      });
    });

    if (allValues.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No valid data points found'
      });
    }

    // Calculate statistics
    const values = allValues.map(v => v.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    const minEntry = allValues.find(v => v.value === min);
    const maxEntry = allValues.find(v => v.value === max);

    // Calculate year-over-year data for chart
    const yearlyAverages = {};
    allValues.forEach(item => {
      if (!yearlyAverages[item.year]) {
        yearlyAverages[item.year] = [];
      }
      yearlyAverages[item.year].push(item.value);
    });

    const chartData = Object.keys(yearlyAverages).sort().map(year => ({
      year,
      average: yearlyAverages[year].reduce((a, b) => a + b, 0) / yearlyAverages[year].length
    }));

    res.json({
      success: true,
      data: {
        category,
        location: location || 'All locations',
        statistics: {
          average: parseFloat(average.toFixed(2)),
          min: {
            value: min,
            year: minEntry.year,
            location: minEntry.location
          },
          max: {
            value: max,
            year: maxEntry.year,
            location: maxEntry.location
          },
          dataPoints: values.length
        },
        chartData
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all data (for admin/debugging)
router.get('/data', async (req, res) => {
  try {
    const data = await TourismData.find().limit(100);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
