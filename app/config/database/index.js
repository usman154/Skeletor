"use strict";
import AppSetting from "../app.setting";

const CONFIGS = AppSetting.getConfig();
module.exports = function(app) {
  require(`./${CONFIGS.DB.DB_TYPE}`)(app);
};
