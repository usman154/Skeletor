import emailDataValidator from "../validators/alerts/email.validator";
import SMSDataValidator from "../validators/alerts/sms.validator";
import { EmailSender, SMSSender } from "../../app/config/alerts";
import { Logger } from "../../app/config";
import {AppSetting} from "../../app/config";
const CONFIG = AppSetting.getConfig();
class NotificationSender {
  constructor() {}
  async emailNotificationSender(emailData) {
    let response = false;
    emailDataValidator.validateEmailData(emailData);
    for (let i = 0; i < emailData.sendTo.length; i++) {
      let user = emailData.sendTo[i];
      response = await this.mailSender(user, emailData.email);
    }
    return response;
  }
  async smsNotificationSender(smsData) {
    SMSDataValidator.validateSMSData(smsData);
    for (let i = 0; i < smsData.sendTo.length; i++) {
      let user = smsData.sendTo[i];
      await this.sendSMS(user, smsData.sms);
    }
  }
  sendSMS(user, sms) {
    return new Promise((resolve, reject) => {
      let smsBody = this.formatNotificationData(sms.body, user),
        subject = this.formatNotificationData(sms.subject, user);
      let smsObject = {
        Message: smsBody,
        MessageStructure: "string",
        PhoneNumber: user.phone,
        Subject: subject,
      };
      Logger.info(smsObject);
      SMSSender.publish(smsObject, function(err, info) {
        if (err) {
          Logger.error(err);
          reject(err);
        } else {
          Logger.info(info);
          resolve(info);
        }
      });
    });
  }
  mailSender(user, email) {
    return new Promise((resolve, reject) => {
      let emailBody = this.formatNotificationData(email.body, user),
        subject = this.formatNotificationData(email.subject, user),
        attachments = email.attachments || [];
      const mailObject = {
        from: CONFIG.APP.MAIL_HOST.user,
        to: user.email,
        subject: subject,
        text: emailBody,
        attachments: attachments,
      };
      Logger.info("Sending email as " + JSON.stringify(mailObject));
      EmailSender.sendMail(mailObject, (error, info) => {
        if (error) {
          Logger.error(error);
          reject(error);
        } else {
          Logger.info(info);
          resolve(info);
        }
      });
    });
  }
  formatNotificationData(body, object) {
    const formattedData = body.replace(/{(\w+)}/g, function(_, k) {
      return object[k];
    });
    return formattedData;
  }
}
export default new NotificationSender();
