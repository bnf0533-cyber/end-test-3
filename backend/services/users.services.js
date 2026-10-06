import {
    getUserByEmail,
    getUserById,
    deletedUsersById,
    registerUser,
    getAllUsers,
} from "../DAL/user.DAL.js";
import { createError } from "../utils/error.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createToken } from "../utils/generateToken.js";
import { isValidId } from "../validation/validId.js";

export async function getAllUsersServices() {
    const get = await getAllUsers();
    if (get.length === 0) {
        throw createError(404, "the list of the users empty");
    }
    if (!get) throw createError(400, "bad request");
    return get;
}

export async function registerUserServices(userData) {
    if (!userData.username || !userData.email || !userData.password) {
        throw createError(400, "missing details");
    }
    const exist = await getUserByEmail(userData.email);
    if (exist) throw createError(400, "user already exists");
    const hash = await hashPassword(userData.password);
    const newUser = {
        ...userData,
        password: hash,
    };
    const id = await registerUser(newUser);
    return {
        id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        assignedArena: userData.assignedArena,
    };
}

export async function loginUserServices(email, password) {
    if (!email || !password) {
        throw createError(400, "missing details");
    }
    const user = await getUserByEmail(email);
    if (!user) throw createError(400, "user not found");
    const isCompare = await comparePassword(password, user.password);
    if (!isCompare) throw createError(400, "password not correct");
    const token = createToken({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        assignedArena: user.assignedArena,
    });
    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            assignedArena: user.assignedArena,
        },
    };
}

export async function deletedUsersByIdService(id) {
    const checkId = isValidId(id);
    if (!checkId)
        throw createError(
            400,
            "id is not valid please try again with one correct!"
        );
    const deleted = await deletedUsersById(id);
    if (!deleted) throw createError(404, "user not found");
    return deleted;
}

export async function getUserByIdService(id) {
    const checkId = isValidId(id);
    if (!checkId)
        throw createError(
            400,
            "id is not valid please try again with one correct!"
        );
    const user = await getUserById(id);
    if (!user) throw createError(404, "user not found");
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        assignedArena: user.assignedArena,
    };
}
