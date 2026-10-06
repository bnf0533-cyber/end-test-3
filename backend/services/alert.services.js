import { createError } from "../utils/error.js";
import { checkSchema, checkUpdateSchema } from "../validation/alert.valid.js";
import {
    createAlert,
    deletedAlertById,
    getAlertById,
    updateAlertById,
} from "../DAL/alert.DAL.js";
import { isValidId } from "../validation/validId.js";

export async function createAlertService(alertData) {
    const checkValid = checkSchema(alertData);
    if (!checkValid.success)
        throw createError(400, "input not valid please check your input");
    const create = await createAlert(checkValid.data);
    return create;
}

export async function getAlertByIdService(id) {
    const checkId = isValidId(id);
    if (!checkId)
        throw createError(
            400,
            "id is not valid please try again with one correct!"
        );
    const get = await getAlertById(id);
    return get;
}

export async function DeletedAlertByIdService(id) {
    const checkId = isValidId(id);
    if (!checkId)
        throw createError(
            400,
            "id is not valid please try again with one correct!"
        );
    const deleted = await deletedAlertById(id);
    return deleted;
}

export async function updateAlertByIdService(id, alertData) {
    const checkData = checkUpdateSchema(alertData);
    if (!checkData.success) throw createError(400, "invalid input");
    const checkId = isValidId(id);
    if (!checkId)
        throw createError(
            400,
            "id is not valid please try again with one correct!"
        );
    const update = await updateAlertById(id, checkData.data);
    return update;
}
