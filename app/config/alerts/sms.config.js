import AWS from 'aws-sdk';
import AppSetting from '../app.setting';
const CONFIG = AppSetting.getConfig();
AWS.config.region = CONFIG.APP.SMS_SENDER.REGION;
AWS.config.update({
    accessKeyId: CONFIG.APP.SMS_SENDER.ACCESS_KEY_ID,
    secretAccessKey: CONFIG.APP.SMS_SENDER.ACCESS_SECRET_KEY,
});

var sns = new AWS.SNS();
// sns.setSMSAttributes(
//     {
//         attributes: {
//             DefaultSMSType: "Transactional",
//             DefaultSenderID: 'CycleTrack'
//         }
//     },
//     function (error) {
//         if (error) {
//             console.log(error);
//         }
//     }
// );

module.exports = sns;