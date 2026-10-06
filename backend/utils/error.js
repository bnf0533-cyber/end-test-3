export function createError(status, data) {
    const error = new Error(data);
    error.status = status;
    return error;
}
