import express from "express";
import verifyRequest from "../../middlewares/verifyRequest.js";
import Timer from "../../db/models/Timer/index.js";

const router = express.Router()

router.use(verifyRequest)

// create a new timer
router.post('/',async(req,res)=>{
    const shop = res.locals.shop

    const existing = await Timer.findOne({ shop });

    if (existing) {
      Object.assign(existing, req.body);
      await existing.save();
      return res.json(existing);
    }
  
    const timer = new Timer({ ...req.body, shop });
    await timer.save();
    res.status(201).json(timer);
    console.log(shop,"Shop")
})

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