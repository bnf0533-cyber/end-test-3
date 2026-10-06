import jwt from "jsonwebtoken";
import "dotenv/config";

export function createToken(data) {
    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_TIME,
    });
    return token;
}

export function verifyToken(token) {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    return verify;
}
