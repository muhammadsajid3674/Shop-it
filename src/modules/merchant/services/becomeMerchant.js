const { STATUS_CODES, ERROR_MESSAGE } = require("../../../utils");
const asyncErrorHandler= require("../../../utils/asyncErrorHandler");

module.exports = asyncErrorHandler((repository) => {
   async function execute(req, res, next) {
      const { userId } = req;
      const { licenseId } = req.body;
      return new Promise((resolve, reject) => {
         if (userId) {
            repository.create({ licenseId, userId }).then((res) => {
               resolve({
                  message: "You are now merchant",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: res,
               });
            });
         }
         next(createHttpError(401, "Request not allowed"));
      });
   }
   return { execute };
});
