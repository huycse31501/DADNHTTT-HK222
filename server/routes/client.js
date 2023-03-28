import express from "express";
import {getArea, getTree, getWatering, getGardener, getAvg} from "../controller/client.js"
const router = express.Router();

router.get("/areas", getArea);
router.get("/trees", getTree)
router.get("/waterings", getWatering)
router.get("/gardeners", getGardener)
router.get("/avg", getAvg)
export default router;
