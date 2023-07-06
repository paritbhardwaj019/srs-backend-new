import express from "express";
import {
  createChat,
  userChats,
  findChat,
} from "../controllers/chat.controller.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictTo("trainer", "trainee"));

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
