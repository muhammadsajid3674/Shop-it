const crypto = require("crypto");
const { ERROR_MESSAGE, STATUS_CODES, ENV } = require("../../../utils");
const nodemailer = require("nodemailer");

module.exports = (repository) => {
  async function execute(objToSend) {
    const { email } = objToSend;
    return new Promise(async (resolve, reject) => {
      const user = await repository.getByEmail(email);
      if (user) {
        const mailer = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: ENV.GMAIL_USER,
            pass: ENV.GMAIL_PASSWORD,
          },
          tls: { rejectUnauthorized: false },
        });
        crypto.randomBytes(32, async (err, buffer) => {
          if (err) return reject(err);
          const token = buffer.toString("hex");
          user.reset_token = token;
          user.token_expired_at = Date.now() + 3600000;
          user.save().then(() => {
            mailer.sendMail({
              to: user.email,
              from: "Accountill <hello@accountill.com>",
              subject: "Password reset request",
              html: `
                      <p>You requested for password reset from Arc Invoicing application</p>
                      <h5>Please click this <a href="https://accountill.com/reset/${token}">link</a> to reset your password</h5>
                      <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                      <p>https://accountill.com/reset/${token}</p>
                      <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                      `,
            });
            return resolve({
              message: "Kindly check your mail",
              statusCode: STATUS_CODES.SUCCESS,
              success: true,
            });
          });
        });
      } else {
        ERROR_MESSAGE["001"].message = "User not found";
        return reject(ERROR_MESSAGE["001"]);
      }
    });
  }
  return { execute };
};
