const express = require('express');
const app = express();
const PORT = 5000; // you can change if needed

app.use(express.json()); // middleware to read JSON bodies

// Disney movies array
const movies = [
  { id: 1, title: 'The Little Mermaid' },
  { id: 2, title: 'Beauty and the Beast' }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome! Use GET /api/movies to see Disney movies or POST /api/movies to add one.');
});

// GET all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// POST new movie
app.post('/api/movies', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newMovie = {
    id: movies.length + 1,
    title: title.trim()
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Start server
app.listen(PORT, () => {
  console.log(`POST demo running on http://localhost:${PORT}`);
});
