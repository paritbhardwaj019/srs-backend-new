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
    const newPackage = await Package.create(req.body);

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

    if (!findUser.packages.includes(packageId)) {
      findUser = await User.findByIdAndUpdate(id, {
        $push: {
          packages: packageId,
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

export const assignPackage = catchAsync(async (req, res, next) => {
  const { trainerId, packageId } = req.body;
  try {
    const newPackage = await Package.findById(packageId);

    const isAlreadyAssigned = !!newPackage.trainer;

    if (isAlreadyAssigned) {
      return res.status(400).json({
        status: "fail",
        message: "Already Assigned Trainer to Package",
      });
    }

    newPackage.trainer = trainerId;
    await newPackage.save();

    res.status(200).json({
      status: "success",
      data: {
        trainerPackage: newPackage,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const getAllPackagesByUser = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const targettedPackages = await Package.find({ trainer: id });

  if (!targettedPackages) {
    return res.status(404).json({
      status: "fail",
      message: "Packages not found with this user id",
    });
  }

  res.status(200).json({
    status: "sucsess",
    data: targettedPackages,
  });
});
