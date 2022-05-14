import Joi from 'joi';

class SMSDataValidator {
    constructor() {
        this.schema = Joi.object().keys({
            sms: Joi.object().keys({
                body: Joi.string().required(),
                subject: Joi.string().required()
            }).required().unknown(true),
            sendTo: Joi.array().required().items(Joi.object().keys({
                phone: Joi.string().required()
            }).unknown(true))

        }).required()
    }

    validateSMSData(data) {
        const { error, value } = this.schema.validate(data);
        if (error) {
            throw error;
        }
    }
}

export default new SMSDataValidator();


