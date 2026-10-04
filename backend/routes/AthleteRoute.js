import express from "express";
import { getAthletes } from "../controllers/AthleteController.js";

// Code écrit par moi
const router = express.Router();
router.get('/athletes', getAthletes);

export default router;