import NOTIFICATION_SENDER from '../utilities/services/notification.service';

function emailDataFormatter(users, email, type) {
    const emailData = {
        [type]: {
            body: email.body,
            subject: email.subject,
            attachments: email.attachments
        },
        sendTo: users
    }
    return emailData;
}

async function notifier(obj) {
    if (obj.type == 'email') {
        const mailData = emailDataFormatter(obj.users, obj.notification, "email");
        return await NOTIFICATION_SENDER.emailNotificationSender(mailData);
    }
    if (obj.type == 'sms') {
        const smsData = emailDataFormatter(obj.users, obj.notification, "sms")
        return await NOTIFICATION_SENDER.smsNotificationSender(smsData);
    }
}


module.exports = notifier;