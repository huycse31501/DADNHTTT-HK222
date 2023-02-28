import express from "express";
import { getStats } from "../controller/stats.js"
const router = express.Router();

router.get("/stats", getStats)


export default router;

