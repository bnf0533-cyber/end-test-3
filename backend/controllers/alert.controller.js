import { getAllAlerts } from "../DAL/alert.DAL.js";
import {
    createAlertService,
    getAlertByIdService,
    DeletedAlertByIdService,
    updateAlertByIdService,
} from "../services/alert.services.js";

export async function createAlertController(req, res) {
    try {
        const { displayName, description, priority, arena, status, lon, lat } =
            req.body;
        const create = await createAlertService({
            displayName,
            description,
            priority,
            arena,
            status,
            lon,
            lat,
        });
        res.status(201).json({ success: true, data: create });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function getAllAlertsController(req, res) {
    try {
        const get = await getAllAlerts();
        res.status(200).json({ success: true, data: get });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function getAlertByIdController(req, res) {
    try {
        const { id } = req.params;
        const get = await getAlertByIdService(id);
        res.status(200).json({ success: true, data: get });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function updateAlertByIdController(req, res) {
    try {
        const { id } = req.params;
        const update = await updateAlertByIdService(id, req.body);
        res.status(200).json({ success: true, data: update });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function deletedAlertByIdController(req, res) {
    try {
        const { id } = req.params;
        const deleted = await DeletedAlertByIdService(id);
        res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}
