const express = require('express');
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Serve frontend static files if configured (e.g., Vite build output)
app.use(express.static('public'));

// In-memory storage for user sleep logs (you can replace this with MongoDB later)
let sleepDatabase = {};

// Endpoint to retrieve a user's sleep data
app.get('/api/sleep/:userName', (req, res) => {
  const userName = req.params.userName;
  const userSleep = sleepDatabase[userName] || {
    Mon: 8.0, Tue: 8.0, Wed: 8.0, Thu: 8.0, Fri: 8.0, Sat: 8.0, Sun: 8.0
  };
  res.json(userSleep);
});

// Endpoint to save/update a user's sleep data
app.post('/api/sleep', (req, res) => {
  const { userName, sleepData } = req.body;
  if (userName && sleepData) {
    sleepDatabase[userName] = sleepData;
    res.json({ success: true, sleepData });
  } else {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

// Set port (default to 4000 or process.env.PORT)
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});