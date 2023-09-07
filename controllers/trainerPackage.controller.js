import * as handler from "../utils/handlerFactory.js";
import TrainerPackage from "../models/TrainerPackage.model.js";
import catchAsync from "../lib/catchAsync.js";

// In trainerPackage.controller.js

export const getAllTrainerPackages = handler.getAll(TrainerPackage);
export const getTrainerPackage = handler.getOne(TrainerPackage);
export const createTrainerPackage = handler.createOne(TrainerPackage);
export const updateTrainerPackage = handler.updateOne(TrainerPackage);
export const deleteTrainerPackage = handler.deleteOne(TrainerPackage);

// export const assignPackage = catchAsync(async (req, res, next) => {
//   const { trainerId, packageId } = req.body;
//   try {
//     const trainerPackage = await TrainerPackage.create({
//       package: packageId,
//       trainer: trainerId,
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         trainerPackage,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// });

// You can add more custom controllers as needed
