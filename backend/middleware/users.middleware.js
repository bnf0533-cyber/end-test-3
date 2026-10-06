import { verifyToken } from "../utils/generateToken.js";

export function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(401)
            .json({ success: false, message: "no token provided" });
    }
    const token = authorization.includes(" ")
        ? authorization.split(" ")[1]
        : authorization;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "no token provided" });
    }
    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "invalid token" });
    }
}
export function arenaMiddleware(req, res, next) {
    if (
        !req.user ||
        (req.user.role !== "arena_user" && req.user.role !== "admin")
    ) {
        return res
            .status(403)
            .json({ success: false, message: "arena_user access required" });
    }
    next();
}

export function generalMiddleware(req, res, next) {
    if (
        !req.user ||
        (req.user.role !== "general_user" && req.user.role !== "admin")
    ) {
        return res
            .status(403)
            .json({ success: false, message: "general_user access required" });
    }
    next();
}

export function adminMiddleware(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res
            .status(403)
            .json({ success: false, message: "admin access required" });
    }
    next();
}
