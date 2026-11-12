import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';
import config from '../../dbConfig.json' with { type: 'json' };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('sleepcompete');
const userCollection = db.collection('users');
const sleepCollection = db.collection('sleep');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log("Connected to MongoDB successfully");
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

export async function getUser(userName) {
  return await userCollection.findOne({ userName: userName });
}

export async function getUserByToken(token) {
  return await userCollection.findOne({ token: token });
}

export async function createUser(userName, passwordHash) {
  const user = {
    userName: userName,
    passwordHash: passwordHash,
    token: randomUUID(), // Uses a secure token instead of raw userName in the cookie
  };
  await userCollection.insertOne(user);
  return user;
}

export async function addSleepData(userName, weekId, sleepData) {
  await sleepCollection.updateOne(
    { userName: userName, weekId: weekId },
    { $set: { sleepData: sleepData, lastUpdated: new Date() } },
    { upsert: true }
  );
}

export async function getSleepData(userName) {
  const cursor = sleepCollection.find({ userName: userName })
    .sort({ lastUpdated: -1 }) 
    .limit(4);
  return await cursor.toArray();
}