import express from "express";
import cors from "cors";
import "dotenv/config";
import "./db/config.db.js";
import alertRouter from "./routers/alert.route.js";
import usersRouter from "./routers/users.route.js";
import helmet from "helmet";

const PORT = process.env.PORT;
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", alertRouter);
app.use("/api/auth", usersRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
