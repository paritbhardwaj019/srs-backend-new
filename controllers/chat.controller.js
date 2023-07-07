import catchAsync from "../lib/catchAsync.js";
import ChatModel from "../models/chat.model.js";

export const createChat = catchAsync(async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const newChat = new ChatModel({
      member: [senderId, receiverId],
    });
    await newChat.save();

    res.status(200).json({
      status: "success",
      data: {
        chat: newChat,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const userChats = catchAsync(async (req, res) => {
  const { userId } = req.params;
  try {
    const chat = await ChatModel.find({
      member: {
        $in: [userId],
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        chat,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const findChat = catchAsync(async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await ChatModel.findOne({
      member: {
        $all: [firstId, secondId],
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        chat,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});
