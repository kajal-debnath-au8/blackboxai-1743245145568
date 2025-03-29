const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Sample data initialization
const sampleLandRecords = [
    {
        khatianNo: '12345',
        plotNo: '456',
        mouza: 'Kolkata',
        district: 'Kolkata',
        owner: 'John Doe',
        area: '0.5 acre',
        type: 'Residential'
    },
    {
        khatianNo: '67890',
        plotNo: '789',
        mouza: 'Howrah',
        district: 'Howrah',
        owner: 'Jane Smith',
        area: '1 acre',
        type: 'Agricultural'
    }
];

const landRecordsPath = path.join(dataDir, 'land_records.json');
if (!fs.existsSync(landRecordsPath)) {
    fs.writeFileSync(landRecordsPath, JSON.stringify(sampleLandRecords, null, 2));
}

// API Routes
app.get('/api/land-records', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(landRecordsPath));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load land records' });
    }
});

app.post('/api/search', (req, res) => {
    const { khatianNo, plotNo, owner } = req.body;
    try {
        const records = JSON.parse(fs.readFileSync(landRecordsPath));
        const results = records.filter(record => {
            return (!khatianNo || record.khatianNo.includes(khatianNo)) &&
                   (!plotNo || record.plotNo.includes(plotNo)) &&
                   (!owner || record.owner.toLowerCase().includes(owner.toLowerCase()));
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// Serve frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});

module.exports = app;