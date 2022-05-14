import { AppSetting } from '../config/app.setting';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CONFIG = AppSetting.getConfig();
import mongoose from 'mongoose';

const USER = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location_id: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    phone: {
        type: String,
        require: true
    },
    created_by: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    }
}, { strict: true, timestamps: true });
USER.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
USER.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

USER.methods.generateJwt = function(timeExp) {
    var expiry = new Date();
    var expiryDays = timeExp || 1;
    expiry.setDate(expiry.getDate() + expiryDays);
    return jwt.sign({
        user_id: this.user_id,
        email: this.email,
        name: this.name,
        location_id: this.location_id,
        phone: this.phone,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000),
    }, CONFIG.APP.PASSWORD_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
USER.methods.formatUser = function() {
    return {
        user_id: this.user_id,
        email: this.email,
        name: this.name,
        phone: this.phone,
        role_id: this.role_id,
        menu_items: this.menu_items,
        location_id: this.location_id,
    };
};

mongoose.model('user', USER);