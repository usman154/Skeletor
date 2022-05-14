import passport from 'passport';
import Api from '../api';
import { RoleService } from '../../app/services';
function jwt(req, res, next) {
    passport.authenticate('local', { session: false }, async (err, passportUser, info) => {
        console.log(err)
        if (err) {
            Api.serverError(req, res, 'Login Failed');
        }
        if (passportUser) {
            const user = passportUser;
            const formattedUser = await user.formatUser();
            const token = await user.generateJwt();
            return res.json({ user: formattedUser, token: token });
        }
        Api.serverError(req, res, 'Login Failed');
    })(req, res, next);
}
module.exports = jwt;
