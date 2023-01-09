import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db("CRAPractice")

module.exports = db