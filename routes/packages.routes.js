// Import required modules
import express from "express";
import * as packagesController from "../controllers/packagesController.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictTo("admin", "trainer"));

// Add the route to create a package
router.post("/packages", packagesController.createPackage);

router.get("/packages", packagesController.getAllPackages);

router
  .route("/packages/:id")
  .get(packagesController.getPackage)
  .patch(packagesController.updatePackage)
  .delete(packagesController.deletePackage);

router.put("/package/buy", packagesController.buyPackage);
router.post("/packages/assign", packagesController.assignPackage);

router.get("/packages/user/all", packagesController.getAllPackagesByUser);

// Export the router
export default router;
