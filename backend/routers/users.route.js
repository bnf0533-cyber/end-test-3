import express from "express";
import {
    deletedUserByIdController,
    getAllUsersController,
    getUserByEmailController,
    loginUserController,
    registerUserController,
} from "../controllers/users.controller.js";
import {
    authMiddleware,
    adminMiddleware,
} from "../middleware/users.middleware.js";

const router = express.Router();

router.post("/login", loginUserController);

router.get("/me", authMiddleware, getUserByEmailController);

router.get("/users", authMiddleware, adminMiddleware, getAllUsersController);

router.post(
    "/register",
    authMiddleware,
    adminMiddleware,
    registerUserController
);

router.delete(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    deletedUserByIdController
);

export default router;
