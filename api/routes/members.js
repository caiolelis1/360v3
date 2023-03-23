import express from "express";
import {
  getMemberEvaluation,
  getColleagues,
  getMemberBySubsystem,
  getMemberPage,
} from "../controllers/member.js";

const router = express.Router();

router.post("/getMemberPage", getMemberPage);
router.post("/getMemberEvaluation", getMemberEvaluation);
router.post("/getColleagues", getColleagues);
router.post("/getMemberBySubsystem", getMemberBySubsystem);

export default router;
