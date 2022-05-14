"use strict";
import express from "express";
import { AppSetting } from "../config";
import fs from "fs";
import { join } from "path";
const router = express.Router();
class ApiRouting {
  static ConfigureRouters(app) {
    const modules = this.getModules();
    for (let module of modules) {
      const routes = this.getRoutesByModule(module);
      for (let route of routes) {
        this.loadRoute(module, route);
      }
    }
    app.use(AppSetting.getConfig().APP.BASE_PATH || "", router);
  }

  static getFile(path) {
    return fs.readdirSync(path).filter((dir) => !dir.match(/(^\.)|index/i));
  }
  static getModules() {
    return this.getFile(join(__dirname, "..", "modules"));
  }
  static getRoutesByModule(module) {
    return this.getFile(join(__dirname, "..", "modules", module, "routes"));
  }
  static loadRoute(module, route) {
    require(join(__dirname, "..", "modules", module, "routes", route))(router);
  }
}
export default ApiRouting;
