import * as handler from '../utils/handlerFactory.js';
import TrainerPackage from '../models/TrainerPackage.model.js';
import catchAsync from '../lib/catchAsync.js';

// In trainerPackage.controller.js

export const getAllTrainerPackages = handler.getAll(TrainerPackage);
export const getTrainerPackage = handler.getOne(TrainerPackage);
export const createTrainerPackage = handler.createOne(TrainerPackage);
export const updateTrainerPackage = handler.updateOne(TrainerPackage);
export const deleteTrainerPackage = handler.deleteOne(TrainerPackage);

// You can add more custom controllers as needed
