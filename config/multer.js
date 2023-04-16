import multer from 'multer';

import AppError from '../utils/appError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) return cb(null, true);
  cb(new AppError('Please upload only image files', 400), false);
};

export default multer({
  storage,
  fileFilter
});
