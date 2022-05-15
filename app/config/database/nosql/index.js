module.exports = function(app) {
    const models = require("./nosql");
    app.set("models", models);
    app.logger.debug("Mongoose models initialized");
  };
  