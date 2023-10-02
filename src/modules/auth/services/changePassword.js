const { STATUS_CODES, ERROR_MESSAGE } = require("../../../utils");

module.exports = (repository) => {
  async function execute(objToSend) {
    const { oldPassword, newPassword, resetToken } = objToSend;
    return new Promise((resolve, reject) => {
      repository.findByResetToken(resetToken).then(async (user) => {
        if (!user) {
          ERROR_MESSAGE["002"].message = "Try again session expired";
          return reject(ERROR_MESSAGE["002"]);
        }
        if (user && !(await user.comparePassword(oldPassword))) {
          ERROR_MESSAGE["002"].message = "Old pasword is incorrect";
          return reject(ERROR_MESSAGE["002"]);
        }
        user.password = newPassword;
        user.reset_token = undefined;
        user.token_expired_at = undefined;
        user.save().then((savedUser) =>
          resolve({
            message: "Password change successfully",
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            data: savedUser,
          })
        );
      });
    });
  }
  return { execute };
};
