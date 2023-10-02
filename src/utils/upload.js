'use strict';

const _ = require('lodash');
const fs = require('fs');
const multer = require("multer");

const generateFilename = (req, file, cb) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix + "." + file.originalname.split(".").pop());
};

const filterImage = (req, file, cb) => {
  // check mime type
  if (
    !file.mimetype.match(
      /image\/(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)/
    )
  ) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(null, "Only image files are allowed!");
  }
  cb(null, true);
};

module.exports = (folderName) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const path = `uploads/${folderName}/`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },

      // By default, multer removes file extensions so let's add them back
      filename: generateFilename,
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB //
    fileFilter: filterImage,
  });
};
