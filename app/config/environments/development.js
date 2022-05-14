import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
	const result = dotenv.config();

	if (result.error) {
		throw result.error;
	}
}

function formatServerAddress() {
	let address = "";
	var isTrueSet = (process.env.IS_SECURE == 'true');
	if (isTrueSet) {
		address = address + 'https://'
	} else {
		address = address + 'http://'
	}
	address = address + process.env.SERVER_IP_ADDRESS + ":" + process.env.ENV_CDT_PORT || 3000;
	console.log(address);
	return address;
}
module.exports = {
	APP: {
		NAME: 'Skeletor',
		PORT: parseInt(process.env.ENV_CDT_PORT || process.env.PORT),
		BASE_PATH: process.env.ENV_CDT_BASE_PATH,
		VERSION: '1.0',
		PASSWORD_SECRET: process.env.PASSWORD_SECRET,
		SERVER_IP_ADDRESS: process.env.SERVER_IP_ADDRESS,
		APP_ADDRESS: formatServerAddress(),
		MAIL_HOST: {
			host: process.env.EMAIL_HOST_NAME,
			secure: process.env.EMAIL_HOST_IS_SECURE,
			port: process.env.EMAIL_HOST_PORT,
			user: process.env.EMAIL_AUTH_USER,
			pass: process.env.EMAIL_AUTH_PASS
		},
		SMS_SENDER: {
			ACCESS_KEY_ID: process.env.SMS_SENDER_ACCESS_KEY_ID,
			ACCESS_SECRET_KEY: process.env.SMS_SENDER_SECRET_ACCESS_KEY,
			REGION: process.env.SMS_SENDER_REGION
		}
	},
	DB: {
		DB_TYPE: process.env.ENV_CDT_DB_TYPE,
		USERNAME: process.env.ENV_CDT_DB_USERNAME,
		PASSWORD: process.env.ENV_CDT_DB_PASSWORD,
		HOST: process.env.ENV_CDT_DB_HOST,
		DATABASE_NAME: process.env.ENV_CDT_DB_NAME,
		PORT: process.env.ENV_CDT_DB_PORT,
		DIALECT: process.env.ENV_CDT_DB_DIALECT,
		ENV_CDT_DATABASE_DEBUG: false
	}
};
