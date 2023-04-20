import express from 'express';
import * as authController from '../controllers/auth.controller.js';

import {
 createWorkoutPlanWithStartDate,
  getAllWorkoutPlans,
  getWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  updateWorkoutPlanCompletion,
} from '../controllers/workoutPlan.controller.js';

const router = express.Router();
router.use(authController.protect);
//login Users
router.patch("/:workoutPlanId/completed", updateWorkoutPlanCompletion);

//trainer and admins only
router.use(authController.restrictTo('admin', 'trainer'));


router.route('/').get(getAllWorkoutPlans).post(createWorkoutPlanWithStartDate);
router.route('/:id').get(getWorkoutPlan).patch(updateWorkoutPlan).delete(deleteWorkoutPlan);

export default router;
