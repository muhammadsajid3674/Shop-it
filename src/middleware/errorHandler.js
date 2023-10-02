const { isHttpError } = require("http-errors");

const errorHandler = (err, req, res, next) => {
   let statusCode = 500;
   let errorMessage = "Server Error";
   if (isHttpError(err)) {
      statusCode = err.status;
      errorMessage = err.message;
   }
   res.status(statusCode).json({ success: false, message: errorMessage });
};

module.export = { errorHandler };
