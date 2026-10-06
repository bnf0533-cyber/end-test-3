import { MongoClient } from "mongodb";
import "dotenv/config";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

try {
    await client.connect();
    console.log("connected to mongo db successfully!");
} catch (error) {
    console.log("failed to connected to mongo db", error);
    process.exit(1);
}
export const db = client.db("alert-map");
