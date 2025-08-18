// Import express and path modules
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware to parse URL-encoded data (form submissions)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// PAGE ROUTES
// =========================

// Home page route (Handling GET request)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Student form page route (Handling GET request)
app.get('/studentForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'studentForm.html'));
});

// Admin form page route (Handling GET request)
app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adminForm.html'));
});

// =========================
// API ROUTES (POST - fixed)
// =========================

// Handle form submission for admin data (POST /api/postAdmin)
app.post('/api/postAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.body; // Extract data from the request body

    // Log the received admin data in the terminal
    console.log('Admin Data Received:', { adminID, firstName, lastName, department });

    res.json({
        message: 'Admin data received successfully!',
        adminData: { adminID, firstName, lastName, department }
    });
});

// Get a single student using POST parameters
app.post('/api/getStudent', (req, res) => {
    const { studentID, firstName, lastName, section } = req.body; // Use body to extract data

    // Log the received student data in the terminal
    console.log('Student Data Received:', { studentID, firstName, lastName, section });

    res.json({
        studentID,
        firstName,
        lastName,
        section,
        message: 'Student data retrieved successfully'
    });
});

// Get a single admin using POST parameters
app.post('/api/getAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.body; // Use body to extract data

    // Log the received admin data in the terminal
    console.log('Admin Data Received:', { adminID, firstName, lastName, department });

    res.json({
        adminID,
        firstName,
        lastName,
        department,
        message: 'Admin data retrieved successfully'
    });
});

// Get all students (sample data for testing)
app.post('/api/getAllStudents', (req, res) => {
    // You can log the data sent here as well if needed
    console.log('Fetching all students...');
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
