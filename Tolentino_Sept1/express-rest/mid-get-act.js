const express = require('express');
const app = express();
const PORT = 4000;

// Array for GET Method (Disney movies)
const movies = [
  { id: 1, title: 'The Lion King', year: 1994 },
  { id: 2, title: 'Aladdin', year: 1992 },
  { id: 3, title: 'Frozen', year: 2013 },
  { id: 4, title: 'Moana', year: 2016 }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome! Try /api/movies to see all Disney movies or /api/movies/1 to see by ID');
});

// GET all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// GET movie by id
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === Number(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`GET demo running on http://localhost:${PORT}`);
});
