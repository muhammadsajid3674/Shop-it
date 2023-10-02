const { default: mongoose } = require("mongoose");

module.exports = class Database {
  constructor(connection) {
    this.connection = connection;

    return mongoose.connect(this.connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};
