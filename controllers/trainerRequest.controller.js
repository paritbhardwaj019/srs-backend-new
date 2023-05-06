// trainerRequest.controller.js
import TrainerRequest from '../models/TrainerRequest.model.js';
import TrainerPackage from '../models/TrainerPackage.model.js';
import * as handler from '../utils/handlerFactory.js';
import catchAsync from '../lib/catchAsync.js';
import AppError from '../utils/appError.js';

// Map of user IDs to socket IDs
const userSocketMap = new Map();

export const createTrainerRequest = (io) => catchAsync(async (req, res, next) => {
    const trainerRequest = await TrainerRequest.create(req.body);
  
    // Get the trainee's socket ID from the userSocketMap
    const traineeId = trainerRequest.trainee;
    console.log('traineeId:', traineeId);
    const traineeSocketId = userSocketMap.get(traineeId);
    console.log('traineeSocketId:', traineeSocketId);
    
    if (!traineeSocketId) {
      return next(new AppError('No socket found for the trainee', 404));
    }
  
    // Emit the request to the trainee's socket ID
    io.to(traineeSocketId).emit('trainerRequestCreated', {
      trainerRequest,
    });
  
    res.status(201).json({
      status: 'success',
      data: {
        trainerRequest,
      },
    });
  });
  

// Get all Trainer Requests for a specific trainee
export const getTrainerRequests = handler.getAll(TrainerRequest);

export const acceptTrainerRequest = (io) => catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;

  const trainerRequest = await TrainerRequest.findByIdAndUpdate(
    requestId,
    { status: 'accepted' },
    { new: true, runValidators: true }
  );

  if (!trainerRequest) {
    return next(new AppError('No request found with that ID', 404));
  }

  const trainerPackage = await TrainerPackage.findByIdAndUpdate(
    trainerRequest.trainerPackage,
    { $addToSet: { traineeIds: trainerRequest.trainee } },
    { new: true, runValidators: true }
  );

  io.emit('trainerRequestAccepted', {
    trainerRequest,
    trainerPackage,
  });

  res.status(200).json({
    status: 'success',
    data: {
      trainerRequest,
      trainerPackage,
    },
  });
});

export const rejectTrainerRequest = (io) => catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;

  const trainerRequest = await TrainerRequest.findByIdAndUpdate(
    requestId,
    { status: 'rejected' },
    { new: true, runValidators: true }
  );

  if (!trainerRequest) {
    return next(new AppError('No request found with that ID', 404));
  }

  io.emit('trainerRequestRejected', {
    trainerRequest,
  });

  res.status(200).json({
    status: 'success',
    data: {
      trainerRequest,
    },
  });
});
