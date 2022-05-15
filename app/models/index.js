import { AppSetting } from "../config";
const CONFIGS = AppSetting.getConfig();

const models = require(`../config/database/${CONFIGS.DB.DB_TYPE}/${CONFIGS.DB.DB_TYPE}`);

module.exports = models;
