const { STATUS_CODES, ERROR_MESSAGE } = require("../../../utils");

module.exports = (repository) => {
   async function execute(objToSend) {
      const { email, password } = objToSend;
      return new Promise((resolve, reject) => {
         repository.resetOne(email, password).then((user) => {
            if (!user) {
               ERROR_MESSAGE["002"].message = "Try again session expired";
               return reject(ERROR_MESSAGE["002"]);
            }
            // if (user && !(await user.comparePassword(oldPassword))) {
            //    ERROR_MESSAGE["002"].message = "Old pasword is incorrect";
            //    return reject(ERROR_MESSAGE["002"]);
            // }
            user.save().then((res) =>
               resolve({
                  message: "Password change successfully",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: res,
               })
            );
         });
      });
   }
   return { execute };
};
