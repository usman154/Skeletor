import { AppSetting } from "../../app.setting";
import fs from "fs";
import { join } from "path";
const CONFIG = AppSetting.getConfig();
const modelsPath = join(__dirname, "..", "..", ".." , "models");
const db = {};
import mongoose from "mongoose";
//connect to database
var dbURI = "mongodb+srv://usman:usman@cluster0.0xxv5.mongodb.net/test?retryWrites=true&w=majority";
// var dbURI = `mongodb+srv://${CONFIG.DB.USERNAME}:${CONFIG.DB.PASSWORD}@cluster0.pq7uu.mongodb.net/${CONFIG.DB.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
// For nodemon restarts
process.once("SIGUSR2", function() {
  gracefulShutdown("nodemon restart", function() {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", function() {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", function() {
  gracefulShutdown("Heroku app termination", function() {
    process.exit(0);
  });
});

fs.readdirSync(modelsPath)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    const sModel = require(join(modelsPath, file))(mongoose);
    const model = sModel;
    db[model.modelName] = model;
  });

module.exports = {...db};
