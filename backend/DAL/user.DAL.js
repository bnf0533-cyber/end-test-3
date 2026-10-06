import { ObjectId } from "mongodb";
import { db } from "../db/config.db.js";

const users = db.collection("users");

export async function getUserByEmail(email) {
    const res = await users.findOne({ email: email });
    return res;
}

export async function getUserById(id) {
    const res = await users.findOne({ _id: new ObjectId(id) });
    return res;
}

export async function getAllUsers() {
    return await users.find().toArray();
}

export async function registerUser(userData) {
    const res = await users.insertOne(userData);
    return res.insertedId;
}

export async function deletedUsersById(id) {
    const res = await users.findOneAndDelete({ _id: new ObjectId(id) });
    return res;
}
