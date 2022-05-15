const Sequelize = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import { AppSetting } from "../config";
const CONFIG = AppSetting.getConfig();
import { SchemaDefiner } from "../../lib";
module.exports = function(sequelize) {
  const UserModel = {
    user_id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    hash: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  };
  const User = SchemaDefiner.define("User", UserModel)(sequelize);

  User.prototype.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
  };
  User.prototype.generateJwt = function(timeExp) {
    var expiry = new Date();
    var expiryDays = timeExp || 1;
    expiry.setDate(expiry.getDate() + expiryDays);
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        name: this.name,
        type: this.type,
        exp: parseInt(expiry.getTime() / 1000),
      },
      CONFIG.APP.PASSWORD_SECRET
    ); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };
  User.prototype.validatePassword = function(password) {
    var hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
    return this.hash === hash;
  };
  User.prototype.formatUser = function() {
    return {
      user_id: this.user_id,
      email: this.email,
      name: this.name,
      type: this.type,
      isAdmin: this.isAdmin,
    };
  };
  return User;
};

/**
 * This is how you can use Mongoose with it
 * 
import { SchemaDefiner } from "../../lib";

module.exports = function(mongoose){
    const schemaObject = {
        location_id: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        code: { type: String, required: true, unique: true }
    };
    return SchemaDefiner.define('location', schemaObject)(mongoose);
}
 */