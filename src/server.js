const app = require("./app");
const logger = require("./utils/logger");
const { ENV } = require("./utils");
const Database = require("./config/database");


new Database(ENV.MONGODB_URI) // * connects to the database using MONGODB cluster URL
  .then(() => {
    app.listen(ENV.PORT, () => {
      logger.info(`Server running on port ${ENV.PORT}`);
    });
  })
  .catch((err) => console.error(err));
