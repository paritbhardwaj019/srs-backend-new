import express from 'express';
import * as authController from '../controllers/auth.controller.js';

import {
 createWorkoutPlanWithStartDate,
  getAllWorkoutPlans,
  getWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from '../controllers/workoutPlan.controller.js';

const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictTo('admin', 'trainer'));


router.route('/').get(getAllWorkoutPlans).post(createWorkoutPlanWithStartDate);
router.route('/:id').get(getWorkoutPlan).patch(updateWorkoutPlan).delete(deleteWorkoutPlan);

export default router;
