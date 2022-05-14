import nodemailer from 'nodemailer';
import AppSetting from '../app.setting';
const CONFIG = AppSetting.getConfig(); 
var transporter = nodemailer.createTransport({
  host: CONFIG.APP.MAIL_HOST.host,
  secure: CONFIG.APP.MAIL_HOST.secure,
  port: CONFIG.APP.MAIL_HOST.port,
  auth: {
    user: CONFIG.APP.MAIL_HOST.user,
    pass: CONFIG.APP.MAIL_HOST.pass
  }
});

module.exports = transporter;
