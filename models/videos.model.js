import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Video name is required"],
  },
  videoUrl: {
    type: String,
    required: [true, "Video Url is required"],
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
