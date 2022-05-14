"use strict";
import AppSetting from "../app.setting";

const CONFIGS = AppSetting.getConfig();

require(`./${CONFIGS.DB.DB_TYPE}`);
