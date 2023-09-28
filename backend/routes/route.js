import express from "express";
import { receivedData } from "../controllers/dataController.js";

const router = express.Router();

router.post("/submit-data", receivedData);

export default router;
