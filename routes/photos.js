import express from "express";
const router = express.Router();
import fs from "fs";
import crypto from "crypto";

router.get("/", (req, res)=>{
    const dataBuffer = fs.readFileSync("./data/photos.json");
    const photoData = JSON.parse(dataBuffer);
    res.send(photoData)
    // res.send("made it to photos")

});

router.get("/:id/comments", (req, res)=>{
    const dataBuffer = fs.readFileSync("./data/photos.json");
    const photoData =JSON.parse(dataBuffer);

    const commentClicked = photoData.find((comment) =>{
        return comment.id === req.params.id;
    })
        if (!commentClicked){
            res.status(404).send("Error: required comment doesn't exist")
        }
        else{
            res.send(commentClicked.comments);
        }
})
router.post("/:id/comments", (req, res)=>{

    console.log("req.body:", req.body);
    console.log(":id", req.params.id);
    const newComment = {
        name: req.body.name,
        comment: req.body.comment,
        id: crypto.randomUUID(),
        timestamp : Date.now(),
    }

    const dataBuffer = fs.readFileSync("./data/photos.json");
    const photoData =JSON.parse(dataBuffer);

    const photoDetails = photoData.find((photo) =>{
        return photo.id === req.params.id;
    })
        if (!photoDetails){
            res.status(404).send("Error posting new comment")
        }
        else{
            photoDetails.comments.unshift(newComment);

            const stringPhotoData = JSON.stringify(photoData);

            fs.writeFileSync("./data/photos.json", stringPhotoData);

            res.status(201).send("successfully posted");
            
        }
})

router.get("/:id", (req, res)=>{
    const dataBuffer = fs.readFileSync("./data/photos.json");
    const photoData =JSON.parse(dataBuffer);

    const photoClicked = photoData.find((comment) =>{
        return comment.id === req.params.id;
    })
        if (!photoClicked){
            res.status(404).send("Error: required photo doesn't exist")
        }
        else{
            res.send(photoClicked);
            // console.log(photoClicked);
        }
  
})

export default router;