import express from "express";
import { getSystems, getSystem } from "../controllers/system.js";

const router = express.Router();

router.post("/getSystems", getSystems);
router.post("/getSystem", getSystem);

export default router;
