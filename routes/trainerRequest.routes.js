// trainerRequest.routes.js
import express from 'express';
import * as trainerRequestController from '../controllers/trainerRequest.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Middleware to pass the io object to the controller
const withIo = (controller) => (req, res, next) => {
  req.io = req.app.get('io');
  return controller(req, res, next);
};

// Protect all routes after this middleware
//router.use(authController.protect);

router
  .route('/')
  .get(trainerRequestController.getTrainerRequests)
  .post(withIo(trainerRequestController.createTrainerRequest));

router
  .route('/:requestId/accept')
  .patch(withIo(trainerRequestController.acceptTrainerRequest));

router
  .route('/:requestId/reject')
  .patch(withIo(trainerRequestController.rejectTrainerRequest));

export default router;
