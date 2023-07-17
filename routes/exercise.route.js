// Import required modules
import express from "express";
import exerciseController from "../controllers/exercise.controller.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictTo("admin", "trainer"));

router.post("/", exerciseController.createExercise);
router.get("/", exerciseController.getAllExercises);
router.get("/:id", exerciseController.getExerciseById);
router.get("/:packageID", exerciseController.getExercisesByPackageID);
router.delete("/:id", exerciseController.deleteExercise);

// Export the router
export default router;
