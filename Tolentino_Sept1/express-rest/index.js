const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1) Root
app.get('/', (req, res) => {
  res.send('Express server is running');
});

// 2) Simulated data (heroes)
const heroes = [
  { id: 1, name: 'Batman', universe: 'DC' },
  { id: 2, name: 'Superman', universe: 'DC' },
  { id: 3, name: 'Iron Man', universe: 'Marvel' },
  { id: 4, name: 'Wonder Woman', universe: 'DC' }
];

// 3) GET all heroes
app.get('/api/heroes', (req, res) => {
  res.json(heroes);
});

// 4) Single route param: /api/heroes/:idOrName
app.get('/api/heroes/:idOrName', (req, res) => {
  const { idOrName } = req.params;
  // Try numeric id first
  const byId = heroes.find(h => String(h.id) === idOrName);
  if (byId) return res.json(byId);

  // else search by name (case-insensitive)
  const byName = heroes.find(h => h.name.toLowerCase() === idOrName.toLowerCase());
  if (byName) return res.json(byName);

  res.status(404).json({ message: 'Hero not found' });
});

// 5) Multi params: /api/heroes/:hero/:universe
app.get('/api/heroes/:hero/:universe', (req, res) => {
  const { hero, universe } = req.params;
  const found = heroes.find(h => h.name.toLowerCase() === hero.toLowerCase()
                                && h.universe.toLowerCase() === universe.toLowerCase());
  if (found) return res.json(found);
  res.status(404).json({ message: 'Hero not found for given universe' });
});

// 6) Query params example: /api/heroes?universe=Marvel
app.get('/api/search/heroes', (req, res) => {
  const { universe, name } = req.query; // optional
  let results = heroes;
  if (universe) results = results.filter(h => h.universe.toLowerCase() === universe.toLowerCase());
  if (name) results = results.filter(h => h.name.toLowerCase().includes(name.toLowerCase()));
  res.json(results);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
