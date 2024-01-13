const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { s3getSignedURL, s3Upload, s3Delete } = require("../utils/s3Service");

exports.createSignedURL = catchAsyncError(async (req, res, next) => {
  // console.log(req)

  const data = s3getSignedURL(req);

  if (!data) {
    return next(new ErrorHandler("Id is invalid!", 400));
  } else {
    data.then((url) => {
      console.log(url);
      res.status(200).json({
        success: true,
        signedurl: url,
        filename: req.query.key,
      });
    });
  }
});

exports.deleteImg = catchAsyncError(async (req, res, next) => {
  const fileName = req.query.key;
  const folder = req.query.folder;

  s3Delete(fileName, folder)
    .then((value) => {
      res.status(200).json({
        success: true,
        value,
      });
    })
    .catch((err) => {
      console.error(err);
      return next(new ErrorHandler("Image delete Failed!", 400));
    });
});
