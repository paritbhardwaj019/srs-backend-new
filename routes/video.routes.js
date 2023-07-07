import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { addVideo } from "../controllers/video.controller.js";

const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router.post("/", addVideo);
router.get("/", getAllVideos);

export default router;
