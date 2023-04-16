// Import the Package model
import catchAsync from '../lib/catchAsync.js';
import Package from '../models/Package.model.js';
import * as handlerFactory from '../utils/handlerFactory.js';


export const getAllPackages = handlerFactory.getAll(Package);
export const getPackage = handlerFactory.getOne(Package);
export const updatePackage = handlerFactory.updateOne(Package);
export const deletePackage = handlerFactory.deleteOne(Package);


// Create a new package
export const createPackage =catchAsync( async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        package: newPackage,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
});
