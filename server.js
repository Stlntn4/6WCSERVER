// Import express and path modules
const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// PAGE ROUTES
// =========================

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Student form page route
app.get('/studentForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'studentForm.html'));
});

// Admin form page route
app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adminForm.html'));
});

// =========================
// API ROUTES (GET)
// =========================

// Get a single student using query parameters
app.get('/api/getStudent', (req, res) => {
    const { studentID, firstName, lastName, section } = req.query; // Extract query parameters
    res.json({
        studentID,
        firstName,
        lastName,
        section,
        message: 'Student data retrieved successfully'
    });
});

// Get a single admin using query parameters
app.get('/api/getAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.query; // Extract query parameters
    res.json({
        adminID,
        firstName,
        lastName,
        department,
        message: 'Admin data retrieved successfully'
    });
});

// Get all students (sample data for testing)
app.get('/api/getAllStudents', (req, res) => {
    res.json([
        { studentID: 1, firstName: "Juan", lastName: "Dela Cruz", section: "A" },
        { studentID: 2, firstName: "Maria", lastName: "Santos", section: "B" }
    ]);
});

// =========================
// Start the server
// =========================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
