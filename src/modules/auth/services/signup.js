const { ERROR_MESSAGE, STATUS_CODES } = require("../../../utils");
const generateToken = require("../../../utils/generateToken");

module.exports = (repository) => {
   async function execute(objToSend) {
      const { email } = objToSend;
      return new Promise(async (resolve, reject) => {
         const emailExist = await repository.getByEmail(email);
         if (emailExist) {
            ERROR_MESSAGE["001"].message = "Email already exists";
            return reject(ERROR_MESSAGE["001"]);
         } else {
            repository.create(objToSend).then((res) => {
               let resObj = res.toObject();
               delete resObj.password;
               return resolve({
                  message: "User registered successfully",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: resObj,
                  token: generateToken(res._id),
               });
            });
         }
      });
   }
   return { execute };
};
