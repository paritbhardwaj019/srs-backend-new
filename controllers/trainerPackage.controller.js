import * as handler from "../utils/handlerFactory.js";
import TrainerPackage from "../models/TrainerPackage.model.js";
import catchAsync from "../lib/catchAsync.js";
import Package from "../models/package.model.js";
import User from "../models/user.model.js";

// In trainerPackage.controller.js

export const getAllTrainerPackages = handler.getAll(TrainerPackage);
export const getTrainerPackage = handler.getOne(TrainerPackage);
export const createTrainerPackage = handler.createOne(TrainerPackage);
export const updateTrainerPackage = handler.updateOne(TrainerPackage);
export const deleteTrainerPackage = handler.deleteOne(TrainerPackage);

export const getAllTraineeByTrainer = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const targettedPackage = await Package.find({ trainer: id });

  let allUsers = [];

  for (const el of targettedPackage) {
    const users = await User.find({
      packages: {
        $in: el._id,
      },
    });

    if (users.length > 0) {
      allUsers = allUsers.concat(users);
    }
  }

  res.status(200).json({
    status: "success",
    data: allUsers,
  });
});
