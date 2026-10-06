import { getUserByEmail } from "../DAL/user.DAL.js";
import {
    getAllUsersServices,
    registerUserServices,
    deletedUsersByIdService,
    loginUserServices,
} from "../services/users.services.js";

export async function getAllUsersController(req, res) {
    try {
        const get = await getAllUsersServices();
        res.status(200).json({ success: true, data: get });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function registerUserController(req, res) {
    try {
        const { username, password, email, role, assignedArena } = req.body;
        const create = await registerUserServices({
            username,
            password,
            email,
            role,
            assignedArena,
        });
        res.status(201).json({ success: true, data: create });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        const login = await loginUserServices(email, password);
        res.status(200).json({ success: true, data: login });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function getUserByEmailController(req, res) {
    try {
        const { email } = req.user;
        const me = await getUserByEmail(email);
        res.status(200).json({ success: true, data: me });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}

export async function deletedUserByIdController(req, res) {
    try {
        const { id } = req.params;
        const deleted = await deletedUsersByIdService(id);
        res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        res.status(error.status || 500).json(
            error.message || "error initial server"
        );
    }
}
