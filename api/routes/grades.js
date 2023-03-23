import express from "express";
import {
  getCriteria,
  getEvaluated,
  insertGrades,
  getMemberGrades,
  getQuestions,
  getSubsystemGrades,
  getMsg,
} from "../controllers/grade.js";

const router = express.Router();

router.post("/getQuestions", getQuestions);
router.post("/getCriteria", getCriteria);
router.post("/getEvaluated", getEvaluated);
router.post("/insertGrades", insertGrades);
router.post("/getMemberGrades", getMemberGrades);
router.post("/getSubsystemGrades", getSubsystemGrades);
router.post("/getMsg", getMsg);

export default router;
