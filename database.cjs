const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');

async function main() {
  try {
    // Insert a document
    const house = {
      name: 'Beachfront views',
      summary: 'From your bedroom to the beach, no shoes required',
      property_type: 'Condo',
      beds: 1,
    };
    await collection.insertOne(house);

    // Query the document back
    const cursor = collection.find();
    const rentals = await cursor.toArray();
    rentals.forEach((i) => console.log(i));
  } finally {
    client.close();
  }
}

main();
