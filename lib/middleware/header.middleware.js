import Joi from 'joi';
import  Api from '../api';
class HeaderMiddleware {
    
	constructor() {}

	static transIDSchema() {
		return Joi.object().keys({
			'x-transid': Joi.string().max(46).required(),
			'x-transparentid' : Joi.string().max(46),
			'x-requestorlang': Joi.string().length(46),
			'content-type': Joi.string().valid('application/json').required()
		});
	}
	static AUTHORIZE() {
		return (req, res, next) => {
			const { error } = Joi.validate(req.headers, this.transIDSchema().unknown(true), {abortEarly: false}); 
			const valid = error == null; 
			if (valid)
				next(); 
			else
				Api.unauthorized(req, res, error.details.map(err => err.message));
		};
	}
    
}
export default HeaderMiddleware;