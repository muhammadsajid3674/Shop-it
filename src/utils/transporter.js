const nodemailer = require("nodemailer");

module.exports = (service, auth = {}) => {
  nodemailer.createTransport({
    service,
    auth,
    tls: { rejectUnauthorized: false },
  });
};
