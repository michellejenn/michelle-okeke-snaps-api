import express from "express";
const router = express.Router();
import fs from "fs";

//helper function to read tags file
function readFile (){
    const dataBuffer = fs.readFileSync("./data/tags.json");
    const tagsData = JSON.parse(dataBuffer)
    return tagsData;
}

//get method to send tags to the front end
router.get("/", (req, res)=>{
    let tags = readFile();
    res.send(tags);
});

export default router;