import * as handlerFactory from '../utils/handlerFactory.js';
import User from '../models/user.model.js';
import multerUpload from '../config/multer.js';
import catchAsync from '../lib/catchAsync.js';
import storeToCloudinary from '../lib/storeToCloudinary.js';
import AppError from '../utils/appError.js';
import WorkoutPlan from '../models/workout_plan.model.js';

export const getAllUsers = handlerFactory.getAll(User);
export const getUser = handlerFactory.getOne(User);
export const updateUser = handlerFactory.updateOne(User);
export const deleteUser = handlerFactory.deleteOne(User);

// user.controller.js

export const getCurrentWorkoutWeekAndDay = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const startDate = user.startDate;
  const { week, day } = getWorkoutWeekAndDay(startDate);

  res.status(200).json({
    status: 'success',
    data: {
      week,
      day,
    },
  });
});

// user.controller.js

export const getWorkoutWeekAndDay = (startDate) => {
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - new Date(startDate);
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  const totalDays = diffInDays + 1;
  const week = Math.ceil(totalDays / 7);
  const day = totalDays % 7 === 0 ? 7 : totalDays % 7;

  return { week, day };
};


export const getUserWorkoutPlans = handlerFactory.getAll(WorkoutPlan)

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const uploadUserPhoto = multerUpload.single('photo');

export const uploadToCloudinary = catchAsync(async (req, res, next) => {
  // Reset any incoming field related to image
  delete req.body.photo;

  // Exit the function if no image found in the request's formData
  if (!req.file) return next();

  // Upload the image to cloudinary for permanent storage
  try {
    const result = await storeToCloudinary(
      req.file.buffer,
      'users',
      `user-${req.user.id}`
    );

    // Save image name to database in next middleware that will get executed
    req.body.photo = result.secure_url;

    // Execute next middleware
    next();
  } catch (err) {
    console.log(err);

    // Send error down to error.controller
    next(new AppError('Could not upload your image'));
  }
});
