import express from "express";
import tagsRoute from "./routes/tags.js"; 
import photoRoute from "./routes/photos.js";
import dotenv from "dotenv";
const app = express();
import cors from "cors";

// loading .env variables into process.env
dotenv.config();

const PORT = process.env.PORT || 8080;
const BASE_URL_BACKEND = process.env.BASE_URL_BACKEND;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/photos", photoRoute);


app.use("/tags", tagsRoute);

app.listen(PORT, () =>{
    console.log(`server running at ${BASE_URL_BACKEND} ${PORT}`); 
});