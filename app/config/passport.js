const passport = require('passport');
const LocalStrategy = require('passport-local');
import { Op } from "sequelize";
import { User } from "../models";

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  User.findOne({ where: { email: {[Op.like]: `%${email.toLowerCase()}%` } } })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));