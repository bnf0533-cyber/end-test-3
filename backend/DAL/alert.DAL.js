import { ObjectId } from "mongodb";
import { db } from "../db/config.db.js";
const alerts = db.collection("alert");

export async function getAllAlerts() {
    return await alerts.find().toArray();
}

export async function getAlertById(id) {
    const res = await alerts.findOne({ _id: new ObjectId(id) });
    return res;
}

export async function createAlert(alertData) {
    const res = await alerts.insertOne(alertData);
    return res.insertedId;
}

export async function deletedAlertById(id) {
    const res = await alerts.findOneAndDelete({ _id: new ObjectId(id) });
    return res;
}

export async function updateAlertById(id, alertData) {
    const res = await alerts.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: alertData }
    );
    return res;
}
