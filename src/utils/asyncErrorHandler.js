const createHttpError = require("http-errors");

const asyncErrorHandler = (req, res, next) => {
   return (req, res, next) =>
      func(req, res, next).catch((error) => {
         let statusCode = 400;
         let message = error instanceof Error ? error.message : "Server Error";
         next(createHttpError(statusCode, message));
      });
};

export default asyncErrorHandler;
