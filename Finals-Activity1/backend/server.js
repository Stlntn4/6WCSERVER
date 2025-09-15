// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake DB
let students = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 22 },
];

let admins = [
  { id: 1, name: "Mr. Smith" },
  { id: 2, name: "Ms. Johnson" },
];

// ================= STUDENT ROUTES =================

// GET all students
app.get("/api/students", (req, res) => res.json(students));

// GET single student by ID
app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// POST new student
app.post("/api/students/add", (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };
  students.push(newStudent);
  res.status(201).json({ message: "Student added!", student: newStudent });
});

// DELETE student by ID
app.delete("/api/students/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: `Student with ID ${id} deleted.` });
});

// ================= ADMIN ROUTES =================

// GET all admins
app.get("/api/admins", (req, res) => res.json(admins));

// GET single admin by ID
app.get("/api/admins/:id", (req, res) => {
  const admin = admins.find(a => a.id === parseInt(req.params.id));
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
});

// POST new admin
app.post("/api/admins/add", (req, res) => {
  const newAdmin = { id: admins.length + 1, ...req.body };
  admins.push(newAdmin);
  res.status(201).json({ message: "Admin added!", admin: newAdmin });
});

// DELETE admin by ID
app.delete("/api/admins/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  admins = admins.filter(a => a.id !== id);
  res.json({ message: `Admin with ID ${id} deleted.` });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
