import { ObjectId } from "mongodb";

export function isValidId(id) {
    const isValid = ObjectId.isValid(id);
    return isValid;
}
