const jwt = require('express-jwt');
import { AppSetting } from '../../app/config';
const CONFIG = AppSetting.getConfig();

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: CONFIG.APP.PASSWORD_SECRET,
        userProperty: 'userInfo',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: CONFIG.APP.PASSWORD_SECRET,
        userProperty: 'userInfo',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;