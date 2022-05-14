import Sequelize from "sequelize";

import { AppSetting, Logger } from "../../config";

const CONFIG = AppSetting.getConfig();
const CONNECTION_INFO = AppSetting.getDBConnection();
const db = new Sequelize(
  CONNECTION_INFO.database,
  CONNECTION_INFO.user,
  CONNECTION_INFO.password,
  {
    host: CONNECTION_INFO.host,
    port: CONNECTION_INFO.port,
    dialect: CONFIG.DB.DIALECT,
  }
);

db.authenticate()
  .then(() => {
    Logger.info("Connection has been established successfully.");
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    Logger.error("Unable to connect to the database:", err);
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });

export default db;
