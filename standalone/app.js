// In-memory data storage
let tourismData = [];
let losChart = null;

// Skip keywords for footer rows
const SKIP_KEYWORDS = ['Data is updated', 'Source of Data', 'Seasonally adjusted', 'Hotel performance'];

// DOM Elements
const losForm = document.getElementById('losForm');
const categorySelect = document.getElementById('category');
const locationSelect = document.getElementById('location');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const resultsDiv = document.getElementById('results');

// Load CSV data
async function loadCSVData() {
    try {
        showLoading();

        // Fetch the CSV file
        const response = await fetch('data.csv');
        const csvText = await response.text();

        // Parse CSV
        Papa.parse(csvText, {
            header: true,
            complete: function(results) {
                processData(results.data);
                populateDropdowns();
                hideLoading();
            },
            error: function(error) {
                showError('Error parsing CSV: ' + error.message);
                hideLoading();
            }
        });
    } catch (error) {
        showError('Error loading CSV file: ' + error.message);
        hideLoading();
    }
}

// Process CSV data
function processData(data) {
    tourismData = [];

    data.forEach(row => {
        const group = row.Group || '';

        // Skip footer/metadata rows and empty rows
        if (!group || SKIP_KEYWORDS.some(keyword => group.includes(keyword))) {
            return;
        }

        const indicator = row.Indicator || '';
        const units = row.Units || 'days';

        // Extract yearly data
        const yearlyData = [];
        Object.keys(row).forEach(key => {
            if (!isNaN(key) && row[key] && row[key].trim() !== '') {
                const value = parseFloat(row[key]);
                if (!isNaN(value)) {
                    yearlyData.push({
                        year: key,
                        value: value
                    });
                }
            }
        });

        if (yearlyData.length > 0) {
            tourismData.push({
                group,
                indicator,
                units,
                yearlyData
            });
        }
    });

    console.log(`Loaded ${tourismData.length} records`);
}

// Populate dropdowns
function populateDropdowns() {
    // Get unique categories and locations
    const categories = [...new Set(tourismData.map(d => d.group))].sort();
    const locations = [...new Set(tourismData.map(d => d.indicator))].sort();

    // Populate category dropdown
    categorySelect.innerHTML = '<option value="">-- Select Category --</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Populate location dropdown
    locationSelect.innerHTML = '<option value="">-- All Locations --</option>';
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const category = categorySelect.value;
    const location = locationSelect.value;

    if (!category) {
        showError('Please select a category');
        return;
    }

    hideError();
    hideResults();

    try {
        const results = calculateLOS(category, location);
        displayResults(results);
    } catch (error) {
        showError('Error calculating results: ' + error.message);
    }
}

// Calculate length of stay
function calculateLOS(category, location) {
    // Filter data
    let filtered = tourismData.filter(record => record.group === category);

    if (location) {
        filtered = filtered.filter(record => record.indicator === location);
    }

    if (filtered.length === 0) {
        throw new Error('No data found for the specified criteria');
    }

    // Collect all values
    const allValues = [];
    filtered.forEach(record => {
        record.yearlyData.forEach(yearData => {
            allValues.push({
                year: yearData.year,
                value: yearData.value,
                location: record.indicator
            });
        });
    });

    if (allValues.length === 0) {
        throw new Error('No valid data points found');
    }

    // Calculate statistics
    const values = allValues.map(v => v.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    const minEntry = allValues.find(v => v.value === min);
    const maxEntry = allValues.find(v => v.value === max);

    // Calculate yearly averages for chart
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

    return {
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
    };
}

// Display results
function displayResults(data) {
    document.getElementById('resultCategory').textContent = data.category;
    document.getElementById('resultLocation').textContent = data.location;

    const stats = data.statistics;
    document.getElementById('avgValue').textContent = stats.average.toFixed(2);
    document.getElementById('minValue').textContent = stats.min.value.toFixed(2);
    document.getElementById('minDetail').textContent = `${stats.min.year} - ${stats.min.location}`;
    document.getElementById('maxValue').textContent = stats.max.value.toFixed(2);
    document.getElementById('maxDetail').textContent = `${stats.max.year} - ${stats.max.location}`;
    document.getElementById('dataPoints').textContent = stats.dataPoints;

    createChart(data.chartData);
    showResults();
}

// Create chart
function createChart(chartData) {
    const ctx = document.getElementById('losChart').getContext('2d');

    if (losChart) {
        losChart.destroy();
    }

    const labels = chartData.map(d => d.year);
    const values = chartData.map(d => d.average);

    losChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Length of Stay (days)',
                data: values,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return 'Average: ' + context.parsed.y.toFixed(2) + ' days';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Days'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// UI Helper functions
function showLoading() {
    loadingDiv.style.display = 'block';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    errorDiv.style.display = 'none';
}

function showResults() {
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResults() {
    resultsDiv.style.display = 'none';
}

// Handle form reset
function handleFormReset() {
    hideError();
    hideResults();
}

// Setup event listeners
losForm.addEventListener('submit', handleFormSubmit);
losForm.addEventListener('reset', handleFormReset);

// Initialize - Load data when page loads
loadCSVData();
