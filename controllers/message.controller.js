import catchAsync from "../lib/catchAsync.js";
import MessageModel from "../models/message.model.js";

export const addMessage = catchAsync(async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    const message = new MessageModel({
      chatId,
      senderId,
      text,
    });
    await message.save();

    res.status(201).json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const getMessages = catchAsync(async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await MessageModel.find({
      chatId,
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
