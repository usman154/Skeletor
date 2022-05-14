import express from "express";
import Services from "../../app/scripts/service-metadata";
var bodyParser = require("body-parser");
let { json, urlencoded } = bodyParser;
import http from "http";
import helmet from "helmet";
import compression from "compression";
import { Api } from "../../lib";
import Initializer from "./initializer";

import { Logger, AppSetting, ApiRouting, ApiDoc } from "../../app/config";
import cors from "cors";

class Server {
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.configure();
  }

  configure() {
    this.configureMiddleware();
    this.configureRoutes();
    this.errorHandler();
  }

  configureMiddleware() {
    this.app.use(compression());
    this.app.use(urlencoded({ limit: "50mb", extended: true }));
    this.app.use(json({ limit: "50mb" }));
    this.app.use(express.static("public"));
    this.app.use("/uploads", express.static("uploads"));
    this.app.use("/reports", express.static("reports"));
    this.CONFIG = AppSetting.getConfig();
    this.enableHelmet();
    this.app.set("PORT", this.CONFIG.APP.PORT);
    Logger.configureLogger(this.app);
  }
  enableHelmet() {
    this.app.use(helmet());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts({ maxAge: 7776000000 }));
    this.app.use(helmet.frameguard("SAMEORIGIN"));
    this.app.use(helmet.xssFilter({ setOnOldIE: true }));
    this.app.use(helmet.noSniff());
  }

  configureRoutes() {
    this.app.use(cors());
    this.app.use(function(req, res, next) {
      for (let key in req.query) {
        if (key) {
          req.query[key.toLowerCase()] = req.query[key];
        }
      }
      next();
    });

    ApiRouting.ConfigureRouters(this.app);
  }

  errorHandler() {
    this.app.use(function(err, req, res, next) {
      if (req.body) {
        Logger.error(req.body);
      }
      Logger.error(err);
      if (err.name === "UnauthorizedError") {
        Api.serverError(req, res, "Credentials verification failed");
      } else Api.serverError(req, res, err);
    });

    // // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      Api.notFound(req, res, {
        code: "9004",
        message: "Invalid resource path",
      });
    });
  }

  run() {
    this.CONFIG = AppSetting.getConfig();
    let server = http.createServer(this.app);

    server.listen(this.CONFIG.APP.PORT, () => {
      console.log(
        `${this.CONFIG.APP.NAME} - is listening on ${server.address().port}`
      );
    });
    var io = require("socket.io")(server);
    io.on("connection", function(socket) {
      console.log("connected");
      socket.on("createRoom", function(room) {
        console.log("Creating room", room);
        socket.join(room);
      });
    });

    this.app.set("socketio", io);
  }

  onError(error) {
    let port = AppSetting.getConfig().APP.PORT;
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
    Logger.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    Logger.error(err, "Uncaught Exception thrown");
    //process.exit(1);
  });
export default new Server();
