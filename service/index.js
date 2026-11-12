import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import * as db from '../database.js'; // Import MongoDB queries

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const authCookieName = 'token';


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


app.post('/api/auth/create', async (req, res) => {
  const { userName, password } = req.body;
  
  const existingUser = await db.getUser(userName);
  if (existingUser) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.createUser(userName, passwordHash);

  setAuthCookie(res, user.token);
  res.send({ userName });
});

app.post('/api/auth/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await db.getUser(userName);
  
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    setAuthCookie(res, user.token);
    res.send({ userName: user.userName });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

app.delete('/api/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = await db.getUserByToken(token);
  
  if (user) {
    req.userName = user.userName; 
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

app.get('/api/sleep/:userName', verifyAuth, async (req, res) => {
  const userName = req.params.userName;
  if (req.userName !== userName) return res.status(403).send({ msg: 'Forbidden' });
  
  // Fetches up to 4 weeks of data
  const history = await db.getSleepData(userName);
  res.json(history);
});

app.post('/api/sleep', verifyAuth, async (req, res) => {
  const { userName, weekId, sleepData } = req.body;
  
  if (userName && weekId && sleepData) {
    await db.addSleepData(userName, weekId, sleepData);
    res.json({ success: true, weekId, sleepData });
  } else {
    res.status(400).json({ error: 'Invalid payload. Requires userName, weekId, and sleepData' });
  }
});


const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});