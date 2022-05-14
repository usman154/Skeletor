import passport from 'passport';
import Api from '../api';
import { RoleService } from '../../app/services';
function jwt(req, res, next) {
    passport.authenticate('local', { session: false }, async (err, passportUser, info) => {
        if (err) {
            Api.serverError(req, res, 'Login Failed');
        }
        if (passportUser) {
            const user = passportUser;
            const userRole = await RoleService.getRoleByRoleId(user.role_id);
            user.menu_items = userRole.menu_items;
            const formattedUser = await user.formatUser();
            user.role = userRole;
            const token = await user.generateJwt();
            return res.json({ user: formattedUser, token: token });
        }
        Api.serverError(req, res, 'Login Failed');
    })(req, res, next);
}
module.exports = jwt;
