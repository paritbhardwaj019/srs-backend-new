// Import the Package model
import catchAsync from "../lib/catchAsync.js";
import Package from "../models/package.model.js";
import User from "../models/user.model.js";
import * as handlerFactory from "../utils/handlerFactory.js";

export const getAllPackages = handlerFactory.getAll(Package);
export const getPackage = handlerFactory.getOne(Package);
export const updatePackage = handlerFactory.updateOne(Package);
export const deletePackage = handlerFactory.deleteOne(Package);

// Create a new package
export const createPackage = catchAsync(async (req, res) => {
  try {
    const newPackage = await Package.create({
      ...req.body,
      trainer: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        package: newPackage,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const buyPackage = catchAsync(async (req, res) => {
  const { packageId } = req.body;
  const { id } = req.user;
  try {
    let findUser = await User.findById(id);

    if (!findUser.package.includes(packageId)) {
      const findUser = await User.findByIdAndUpdate(id, {
        $push: {
          package: packageId,
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: findUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});
