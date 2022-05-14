import Sequelize from "sequelize";
import fs from "fs";
import { AppSetting, Logger } from "..";
import { join } from "path";
import lodash from "lodash";
const db = {};
const CONFIG = AppSetting.getConfig();
const CONNECTION_INFO = AppSetting.getDBConnection();
const modelsPath = join(__dirname, "..", "..", "models");

const sequelize = new Sequelize(
  CONNECTION_INFO.database,
  CONNECTION_INFO.user,
  CONNECTION_INFO.password,
  {
    host: CONNECTION_INFO.host,
    port: CONNECTION_INFO.port,
    dialect: CONFIG.DB.DIALECT,
    query: { raw: false },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    Logger.info("Connection has been established successfully.");
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    Logger.error("Unable to connect to the database:", err);
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });

fs.readdirSync(modelsPath)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    console.log(join(modelsPath, file));
    const sModel = require(join(modelsPath, file))(sequelize);
    const model = sModel;
    db[model.name] = model;
  });

Object.keys(db)
  .map((name) => db[name])
  .filter((model) => model.associate)
  .forEach((model) => model.associate(db));

module.exports = lodash.extend(
  {
    sequelize,
    Sequelize,
  },
  db
);
