import express from "express";
const router = express.Router();
import fs from "fs";

router.get("/", (req, res)=>{
    const dataBuffer = fs.readFileSync("./data/tags.json");
    const tagsData = JSON.parse(dataBuffer)
    res.send(tagsData);
});

export default router;