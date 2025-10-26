const mongoose = require('mongoose');

const tourismDataSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
    index: true
  },
  indicator: {
    type: String,
    required: true,
    index: true
  },
  units: {
    type: String,
    default: 'days'
  },
  yearlyData: [{
    year: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Compound index for faster queries
tourismDataSchema.index({ group: 1, indicator: 1 });

module.exports = mongoose.model('TourismData', tourismDataSchema);
