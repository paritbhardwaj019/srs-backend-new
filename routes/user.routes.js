import express from 'express';

import * as authController from '../controllers/auth.controller.js';
import * as userController from '../controllers/user.controller.js';


const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// ////////////////////////////////////// ROUTES FOR LOGGED IN USERS ONLY //////////////////////////////////////
router.use(authController.protect);

router
  .route('/me')
  .get(userController.getMe, userController.getUser)
  .patch(
    userController.getMe,
    userController.uploadUserPhoto,
    userController.uploadToCloudinary,
    userController.updateUser
  )
  .delete(userController.getMe, userController.deleteUser);

  router.route('/user-workout-plans').get(userController.getUserWorkoutPlans);



// ////////////////////////////////////// ADMIN ONLY ROUTES //////////////////////////////////////
router.use(authController.restrictTo('admin', 'trainer'));

router.get('/', userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
