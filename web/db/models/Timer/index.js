import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  description: String,
  appearance: {
    color: String,
    position: String,
  },
  urgencyTriggerMinutes: {
    type: Number,
    default: 5,
  },
});

const Timer = mongoose.model("Timer", timerSchema);

export default Timer;
