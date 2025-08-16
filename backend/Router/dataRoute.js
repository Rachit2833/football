import express from "express";
import { addMatchData, getAllMatches, getMatchesById } from "../Controller/dataController.js";
const router = express.Router()
router.route("/").get(getAllMatches).post(addMatchData)
router.route("/:id").get(getMatchesById)
export default router