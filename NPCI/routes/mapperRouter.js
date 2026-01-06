import express from "express";
import { checkMapping } from "../controller/mapperController.js";

const mapperRouter = express.Router();

mapperRouter.post("/", checkMapping);
// router.get("/:aadharid", isLoggedIn, getMessages);
// router.post("/send/:id", isLoggedIn, sendMessage);

export default mapperRouter;
