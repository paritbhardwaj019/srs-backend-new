import catchAsync from "../lib/catchAsync";
import Video from "../models/videos.model";
import cloudinary from "../config/cloudinary";
import * as fs from "fs";

export const addVideo = catchAsync(async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({
        status: "fail",
        error: "No video file uploaded",
      });
    }

    const video = req.files.video;

    const uploadPath = __dirname + "/uploads/videos/" + video.name;

    video.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send({
          status: "fail",
          error: "Failed to upload video",
        });
      }

      cloudinary.uploader.upload(
        uploadPath,
        { resource_type: "video" },
        (err, results) => {
          if (err) {
            return res.status(500).send({
              status: "fail",
              error: "Failed to upload video to cloudinary",
            });
          }

          fs.unlink(uploadPath, async (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error while deleting file:", unlinkErr);
            }

            const video = await Video.create({
              name: req.body.name,
              videoUrl: results.secure_url,
            });

            res.status(200).json({
              status: "success",
              data: {
                video,
              },
            });
          });
        }
      );
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});
