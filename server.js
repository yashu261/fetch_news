const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const newsRoutes = require('./routes/newsRoutes');

// API Routes
app.use('/api/news', newsRoutes);

// Health check for API
app.get('/api/health', (req, res) => {
  res.json({ message: 'News Fetcher API is running 📰' });
});

// Redirect root '/' to /docs
app.get('/', (req, res) => {
  res.redirect('/docs/');
});

// Serve React frontend static files in production
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route - serve React app for any non-API routes (after all other routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});