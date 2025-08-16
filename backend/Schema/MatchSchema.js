import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  date: {
    type: String, // or Date if you prefer
    required: true
  },
  stage: {
    type: String, // e.g., "League", "Knockouts", "Final"
    required: true
  },
  teamAName: {
    type: String,
    required: true
  },
  teamBName: {
    type: String,
    required: true
  },
  stats: {
    teamA: {
      goals: { type: Number, required: true },
      possession: { type: String, required: true }, // e.g., "50%"
      passes: { type: Number, required: true },
      shots: { type: Number, required: true },
      shotsOnTarget: { type: Number, required: true },
      corners: { type: Number, required: true }
    },
    teamB: {
      goals: { type: Number, required: true },
      possession: { type: String, required: true },
      passes: { type: Number, required: true },
      shots: { type: Number, required: true },
      shotsOnTarget: { type: Number, required: true },
      corners: { type: Number, required: true }
    }
  }
});

// Create model
const Match = mongoose.model("Match", MatchSchema);

export default Match;
