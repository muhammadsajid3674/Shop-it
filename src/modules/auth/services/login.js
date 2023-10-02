const { ERROR_MESSAGE, STATUS_CODES } = require("../../../utils");

module.exports = (repository) => {
   async function execute(objToSend) {
      const { email, password } = objToSend;
      return Promise.all([repository.getByEmail(email)]).then(async (res) => {
         if (res[0]) {
            if (await res[0].comparePassword(password)) {
               return Promise.resolve({
                  message: "User logged in successfully",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: res,
               });
            } else {
               ERROR_MESSAGE["001"].message = "Password do not match";
               return Promise.reject(ERROR_MESSAGE["001"]);
            }
         } else {
            ERROR_MESSAGE["001"].message = "User not found";
            return Promise.reject(ERROR_MESSAGE["001"]);
         }
      });
   }
   return { execute };
};
