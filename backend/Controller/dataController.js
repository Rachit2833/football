import mongoose from "mongoose";
import Match from "../Schema/MatchSchema.js";

export async function addMatchData(req, res) {
    try {
        const match = await Match.create(req.body);
        return res.status(201).json(match);
    } catch (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to add match",
            error: error.message
        });
    }
}
export async function getAllMatches(req, res) {
    try {
        let { page, limit } = req.query
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 12
        }
        const skip = page === 1 ? 0 : page * limit
        const data = await Match.find()
            .skip(skip)
            .limit(limit)
            .select("_id date stage teamAName teamBName");
        res.status(200).json( data )
    } catch (error) {
        res.status(400).json({
            message: "Something went Wrong"
        })
    }
}



export async function getMatchesById(req, res) {
  try {
    const { id } = req.params; // ✅ correct param name

    // 1️⃣ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Not a valid ID" });
    }

    // 2️⃣ Find by ID
    const data = await Match.findById(id);

    // 3️⃣ Check if document exists
    if (!data) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json( data );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
