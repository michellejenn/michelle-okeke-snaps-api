import express from "express";
const router = express.Router();
import fs from "fs/promises"; //added this to enable use of async/await for error handling
import crypto from "crypto";

// Helper function to read JSON data
const readPhotoData = async () => {
  const dataBuffer = await fs.readFile("./data/photos.json", "utf-8");
  return JSON.parse(dataBuffer);
};

// Helper function to write JSON data
const writePhotoData = async (data) => {
  const stringPhotoData = JSON.stringify(data); 
  await fs.writeFile("./data/photos.json", stringPhotoData);
};

// Route to get all photos
router.get("/", async (req, res) => {
  try {
    const photoData = await readPhotoData();
    res.send(photoData);
  } catch (error) {
    res.status(500).send("Error reading photo data.");
  }
});

// Route to get comments for a specific photo
router.get("/:id/comments", async (req, res) => {
  try {
    const photoData = await readPhotoData();
    const photo = photoData.find((photo) => {
        return photo.id === req.params.id});

    if (!photo) {
      return res.status(404).send("Error: Photo not found");
    }
    res.send(photo.comments);

  } catch (error) {
    res.status(500).send("Error fetching comments.");
  }
});

// Route to post a new comment for a specific photo
router.post("/:id/comments", async (req, res) => {
  try {
    const newComment = {
      name: req.body.name,
      comment: req.body.comment,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    const photoData = await readPhotoData();
    const photo = photoData.find((photo) => {
       return photo.id === req.params.id});

    if (!photo) {
      return res.status(404).send("Error: Photo not found");
    }

    photo.comments.unshift(newComment);
    await writePhotoData(photoData);

    res.status(201).send("Successfully posted comment.");

  } catch (error) {
    res.status(500).send("Error posting comment.");
  }
});

// Route to get a specific photo by ID
router.get("/:id", async (req, res) => {
  try {
    const photoData = await readPhotoData();
    const photo = photoData.find((photo) => {
       return photo.id === req.params.id});
  

    if (!photo) {
      return res.status(404).send("Error: Photo not found");
    }
    res.send(photo);

  } catch (error) {
    res.status(500).send("Error fetching photo.");
  }
});

export default router;