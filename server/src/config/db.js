import mongoose from "mongoose";

class Database {
   constructor(connection) {
      this.connection = connection;

      return mongoose.connect(this.connection, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
   }
}

export default Database;
