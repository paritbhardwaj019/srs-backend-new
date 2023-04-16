import * as handlerFactory from '../utils/handlerFactory.js';
import User from '../models/user.model.js';
import multerUpload from '../config/multer.js';
import catchAsync from '../lib/catchAsync.js';
import storeToCloudinary from '../lib/storeToCloudinary.js';
import AppError from '../utils/appError.js';

export const getAllUsers = handlerFactory.getAll(User);
export const getUser = handlerFactory.getOne(User);
export const updateUser = handlerFactory.updateOne(User);
export const deleteUser = handlerFactory.deleteOne(User);

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
