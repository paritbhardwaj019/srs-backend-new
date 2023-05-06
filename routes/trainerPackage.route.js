import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as trainerPackageController from '../controllers/trainerPackage.controller.js';

const router = express.Router();

// Routes for all users
router.get('/check-token-expiration', authController.checkTokenExpiration);

// Routes for logged-in users only
router.use(authController.protect);



router
  .route('/:id')
  .get(trainerPackageController.getTrainerPackage);

// Admin and trainer only routes
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(trainerPackageController.getAllTrainerPackages)
  .post(trainerPackageController.createTrainerPackage);
  router
  .route('/:id')
  .patch(trainerPackageController.updateTrainerPackage)
  .delete(trainerPackageController.deleteTrainerPackage);

// Add any additional routes for admin and trainer users here

export default router;
