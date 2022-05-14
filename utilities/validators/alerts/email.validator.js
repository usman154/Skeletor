import Joi from 'joi';

class EmailDataValidator {
    constructor() {
        this.schema = Joi.object().keys({
            email: Joi.object().keys({
                body: Joi.string().required(),
                subject: Joi.string().required(),
                attachments: Joi.array().items(Joi.object().keys({
                    filename: Joi.string().required(),
                    path: Joi.string().required()
                }))
            }).required(),
            sendTo: Joi.array().required().items(Joi.object().keys({
                email: Joi.string().email().required()
            }).unknown(true))

        }).required()
    }

    validateEmailData(data) {
        const { error, value } = this.schema.validate(data);
        if (error) {
            throw error;
        }
    }
}

export default new EmailDataValidator();


