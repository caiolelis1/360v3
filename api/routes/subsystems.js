import express from "express";
import {
  getSubsystems,
  getSubsystem,
  getSubsystemBySystem,
} from "../controllers/subsystem.js";

const router = express.Router();

router.post("/getSubsystems", getSubsystems);
router.post("/getSubsystem", getSubsystem);
router.post("/getSubsystemBySystem", getSubsystemBySystem);

export default router;
