import { promisify } from "util";

import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import signAndSendToken from "../lib/signToken.js";
import catchAsync from "../lib/catchAsync.js";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
dotenv.config();

// controllers/authController.js

export const checkTokenExpiration = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      status: "fail",
      message: "No token provided or token format is incorrect",
    });
  }

  const token = authHeader.split(" ")[1];

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user based on decoded payload
    user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Token is still valid",
      data: {
        role: user.role,
      },
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired",
      });
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token",
      });
    }
  }
};

export const signUp = catchAsync(async (req, res, next) => {
  delete req.body.role;
  const user = await User.create(req.body);
  signAndSendToken(user, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  // Get email and password from request body
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password to login"));

  // Find user based on email (DON'T FORGET TO MANUALLY SELECT PASSWORD TOO)
  const user = await User.findOne({ email }).select("+password");

  // Check if password is correct using a mongoose instance method defined in user.model.js
  if (!user || !user.checkPassword(password))
    return next(new AppError("Invalid email or password"));

  // Create token for user and send response
  signAndSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // Get jwt token from request headers
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return next(new AppError("Please login to access this route", 401));

  // Verify jwt token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find user based on decoded payload
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );

  // Grant access
  req.user = user;
  next();
});

export const restrictTo =
  (...roles) =>
  (req, res, next) =>
    next(
      roles.includes(req.user?.role)
        ? null
        : new AppError("You are not allowed to access this route", 403)
    );
