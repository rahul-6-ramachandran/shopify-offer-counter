import express from "express";
import verifyRequest from "../../middlewares/verifyRequest.js";
import Timer from "../../db/models/Timer/index.js";

const router = express.Router()

router.use(verifyRequest)

// create a new timer
router.post("/", async (req, res) => {
    const { title, startTime, endTime } = req.body;
  
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const newTimer = new Timer({ title, startTime, endTime });
      await newTimer.save();
      res.status(201).json(newTimer);
    } catch (error) {
      console.error("Failed to create timer", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// get an existing timer
router.get("/", async (req, res) => {
    const shop = res.locals.shop;
    const timer = await Timer.findOne({ shop });
  
    if (!timer) {
      return res.status(404).json({ message: "No timer found" });
    }
  
    res.json(timer);
  });
  

export default router