import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = {};
let sleepDatabase = {};
const authCookieName = 'token';

// ==========================================
// 1. THIRD-PARTY API ENDPOINT (Fallback)
// ==========================================
app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ 
      content: 'Sleep is the golden chain that ties health and our bodies together.', 
      author: 'Thomas Dekker' 
    });
  }
});

// ==========================================
// 2. AUTHENTICATION ENDPOINTS
// ==========================================
app.post('/api/auth/create', async (req, res) => {
  const { userName, password } = req.body;
  if (users[userName]) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users[userName] = { userName, passwordHash };

  setAuthCookie(res, userName);
  res.send({ userName });
});

app.post('/api/auth/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = users[userName];
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    setAuthCookie(res, userName);
    res.send({ userName });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

app.delete('/api/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

function setAuthCookie(res, userName) {
  res.cookie(authCookieName, userName, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// ==========================================
// 3. RESTRICTED ENDPOINTS & MIDDLEWARE
// ==========================================
const verifyAuth = (req, res, next) => {
  const userName = req.cookies[authCookieName];
  if (userName && users[userName]) {
    req.userName = userName;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

app.get('/api/sleep/:userName', verifyAuth, (req, res) => {
  const userName = req.params.userName;
  const userSleep = sleepDatabase[userName] || {
    Mon: 8.0, Tue: 8.0, Wed: 8.0, Thu: 8.0, Fri: 8.0, Sat: 8.0, Sun: 8.0
  };
  res.json(userSleep);
});

app.post('/api/sleep', verifyAuth, (req, res) => {
  const { userName, sleepData } = req.body;
  if (userName && sleepData) {
    sleepDatabase[userName] = sleepData;
    res.json({ success: true, sleepData });
  } else {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

// ==========================================
// SERVER INITIALIZATION
// ==========================================
// REQUIRED CHANGE: Use process.argv to dynamically select the port
const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});