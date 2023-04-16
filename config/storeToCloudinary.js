import cloudinary from '../config/cloudinary.js';

const storeToCloudinary = (buffer, folder, fileName) =>
  new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          public_id: fileName,
          width: 400,
          height: 400,
          crop: 'fill'
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
      .end(buffer)
  );

export default storeToCloudinary;
