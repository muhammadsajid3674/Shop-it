
// const { connect } = require('./config/db.config');
// const profile = require('./data/profile.data');
// const Profile = require('./models/profile.model');
// const path = require("path");

// require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
// connect();

// const importData = async () => {
//     try {
//         await Profile.deleteMany();
//         await Profile.insertMany(profile);
//         console.log('Data imported!');
//         process.exit();
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }
// const destroyData = async () => {
//     try {
//         await Task.deleteMany();
//         console.log('Data Destroyed!');
//         process.exit();
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// if (process.argv[2] == '-d') {
//     destroyData();
// } else {
//     importData();
// }