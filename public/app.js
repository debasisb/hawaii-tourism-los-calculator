// API Base URL
const API_BASE = '/api';

// Global chart instance
let losChart = null;

// DOM Elements
const losForm = document.getElementById('losForm');
const categorySelect = document.getElementById('category');
const locationSelect = document.getElementById('location');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const resultsDiv = document.getElementById('results');

// Initialize the app
async function init() {
    try {
        await loadCategories();
        await loadLocations();
        setupEventListeners();
    } catch (error) {
        showError('Failed to initialize application: ' + error.message);
    }
}

// Load categories from API
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();

        if (data.success) {
            categorySelect.innerHTML = '<option value="">-- Select Category --</option>';
            data.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        } else {
            throw new Error(data.error || 'Failed to load categories');
        }
    } catch (error) {
        showError('Error loading categories: ' + error.message);
    }
}

// Load locations from API
async function loadLocations() {
    try {
        const response = await fetch(`${API_BASE}/locations`);
        const data = await response.json();

        if (data.success) {
            locationSelect.innerHTML = '<option value="">-- All Locations --</option>';
            data.data.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                locationSelect.appendChild(option);
            });
        } else {
            throw new Error(data.error || 'Failed to load locations');
        }
    } catch (error) {
        showError('Error loading locations: ' + error.message);
    }
}

// Setup event listeners
function setupEventListeners() {
    losForm.addEventListener('submit', handleFormSubmit);
    losForm.addEventListener('reset', handleFormReset);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const category = categorySelect.value;
    const location = locationSelect.value;

    if (!category) {
        showError('Please select a category');
        return;
    }

    hideError();
    hideResults();
    showLoading();

    try {
        const response = await fetch(`${API_BASE}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, location })
        });

        const data = await response.json();

        if (data.success) {
            displayResults(data.data);
        } else {
            throw new Error(data.error || 'Calculation failed');
        }
    } catch (error) {
        showError('Error calculating results: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Handle form reset
function handleFormReset() {
    hideError();
    hideResults();
}

// Display results
function displayResults(data) {
    // Update result header
    document.getElementById('resultCategory').textContent = data.category;
    document.getElementById('resultLocation').textContent = data.location;

    // Update statistics
    const stats = data.statistics;
    document.getElementById('avgValue').textContent = stats.average.toFixed(2);
    document.getElementById('minValue').textContent = stats.min.value.toFixed(2);
    document.getElementById('minDetail').textContent =
        `${stats.min.year} - ${stats.min.location}`;
    document.getElementById('maxValue').textContent = stats.max.value.toFixed(2);
    document.getElementById('maxDetail').textContent =
        `${stats.max.year} - ${stats.max.location}`;
    document.getElementById('dataPoints').textContent = stats.dataPoints;

    // Create chart
    createChart(data.chartData);

    // Show results
    showResults();
}

// Create chart using Chart.js
function createChart(chartData) {
    const ctx = document.getElementById('losChart').getContext('2d');

    // Destroy existing chart if it exists
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
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResults() {
    resultsDiv.style.display = 'none';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
