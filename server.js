// Import express, multer, path, and other necessary modules
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
const PORT = 5000;

// Setup multer storage
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Ensure 'uploads' folder exists
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// Use multer to handle file uploads
var upload = multer({ storage: storage }).fields([
    { name: 'file', maxCount: 1 }
]);

// Middleware for parsing form data (for non-multipart forms and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve file upload form (adminForm.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/adminForm.html'));
});

// Handle form submission for admin data + file upload
app.post('/api/postAdmin', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'File upload failed' });
        }

        // Access text fields
        const { adminID, firstName, lastName, department, username } = req.body;

        // Access uploaded file
        const uploadedFile = req.files && req.files['file'] ? req.files['file'][0] : null;

        // ✅ Log everything in one console.log with formatting
        console.log(`
=== Admin Data Received ===
Admin ID: ${adminID}
First Name: ${firstName}
Last Name: ${lastName}
Department: ${department}
Username: ${username}
Uploaded File: ${uploadedFile ? uploadedFile.path : "No file uploaded"}
===========================
        `);

        res.json({
            message: 'Admin data + file uploaded successfully!',
            adminData: { adminID, firstName, lastName, department, username },
            file: uploadedFile ? uploadedFile.path : null
        });
    });
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Home page route (Handling GET request)
app.get('/home', (req, res) => {
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

// Handle form submission for getting a single student
app.post('/api/getStudent', (req, res) => {
    const { studentID, firstName, lastName, section } = req.body;

    // ✅ Pretty log
    console.log(`
=== Student Data Received ===
Student ID: ${studentID}
First Name: ${firstName}
Last Name: ${lastName}
Section: ${section}
=============================
    `);

    res.json({
        studentID,
        firstName,
        lastName,
        section,
        message: 'Student data retrieved successfully'
    });
});

// Handle form submission for getting a single admin (no file upload here)
app.post('/api/getAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.body;

    // ✅ Pretty log
    console.log(`
=== Admin Data Retrieved ===
Admin ID: ${adminID}
First Name: ${firstName}
Last Name: ${lastName}
Department: ${department}
=============================
    `);

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
    console.log("\n=== Get All Students Called ===\n");
    res.json([
        { studentID: 1, firstName: "Juan", lastName: "Dela Cruz", section: "A" },
        { studentID: 2, firstName: "Maria", lastName: "Santos", section: "B" }
    ]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
