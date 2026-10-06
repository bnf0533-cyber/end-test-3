import express from "express";
import {
    getAllAlertsController,
    getAlertByIdController,
    createAlertController,
    updateAlertByIdController,
    deletedAlertByIdController,
} from "../controllers/alert.controller.js";
import {
    authMiddleware,
    adminMiddleware,
} from "../middleware/users.middleware.js";

const router = express.Router();

router.get("/alerts", getAllAlertsController);

router.get("/alerts/:id", getAlertByIdController);

router.post("/alerts", createAlertController);

router.put("/alerts/:id", authMiddleware, updateAlertByIdController);

router.delete(
    "/alerts/:id",
    authMiddleware,
    adminMiddleware,
    deletedAlertByIdController
);

export default router;
