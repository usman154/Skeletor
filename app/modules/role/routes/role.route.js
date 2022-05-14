import roleController from '../controllers/role.controller';
import {AuthMiddleware as auth} from '../../../../lib/middleware';
import {AccessMiddleware as access} from '../../../../lib/middleware';

module.exports = async (router) => {
    router.get('/role', auth.required, access.required,  await roleController.getRole);
    router.get('/role/:roleId',  auth.required, access.required, await roleController.getRoleByRoleId);
};