// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Sample data
const items = [
  { id: 1, name: "First item from my server" },
  { id: 2, name: "Another cool item" },
  { id: 3, name: "Learning Vue is fun!" },
];

// API endpoint
app.get("/api/items", (req, res) => {
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
