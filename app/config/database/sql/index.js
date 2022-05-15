module.exports = function(app) {
  const models = require("./sql");
  app.set("sequelize", models.sequelize);
  app.set("models", models.sequelize.models);
  models.sequelize
    .sync({ alter: true })
    .then(() => app.logger.debug("Sequelize synced"))
    .catch((error) => {
      console.log(error);
      app.logger.error("Sequelize sync failed: ", error.message);
    });
};
