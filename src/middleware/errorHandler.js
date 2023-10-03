const { rateLimit } = require("express-rate-limit");
const { isHttpError } = require("http-errors");
const logger = require("../utils/logger");

exports.requestLogger = (request, response, next) => {
   logger.info("Method:", request.method);
   logger.info("Path:  ", request.path);
   logger.info("Body:  ", request.body);
   logger.info("-----------------------");
   next();
};

exports.unknownEndpoint = (request, response, next) => {
   const error = new Error(`Not Found - ${request.originalUrl}`);
   response.status(404);
   next(error);
};

exports.errorHandler = (err, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode
   res.status(statusCode)
   res.json({
       message: err.message,
       stack: process.env.NODE_ENV === 'production' ? null : err.stack
   })
   // let statusCode = 500;
   // let errorMessage = "Server Error";
   // if (isHttpError(err)) {
   //    statusCode = err.status;
   //    errorMessage = err.message;
   // }
   // res.status(statusCode).json({ success: false, message: errorMessage });
};
exports.rateLimiterUsingThirdParty = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
