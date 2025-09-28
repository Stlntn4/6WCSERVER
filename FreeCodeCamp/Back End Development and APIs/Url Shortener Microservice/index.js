require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dns = require('dns');
const { URL } = require('url');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

// MongoDB connection
const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
let urls;

async function connectDb() {
  try {
    await client.connect();
    const db = client.db('urlshortener');
    urls = db.collection('urls');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}
connectDb();

// Routes
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Create short URL
app.post('/api/shorturl', async (req, res) => {
  let inputUrl = req.body.url;
  let hostname;

  try {
    const urlObj = new URL(inputUrl);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return res.json({ error: 'invalid url' });
    }
    hostname = urlObj.hostname;
  } catch {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, async (err) => {
    if (err) return res.json({ error: 'invalid url' });

    const count = await urls.countDocuments({});
    const shortUrl = count + 1;

    const doc = { original_url: inputUrl, short_url: shortUrl };
    await urls.insertOne(doc);

    res.json({ original_url: inputUrl, short_url: shortUrl });
  });
});

// Redirect to original URL
app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  const doc = await urls.findOne({ short_url: shortUrl });
  if (!doc) {
    return res.json({ error: 'No short url found for given input' });
  }

  res.redirect(doc.original_url);
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
