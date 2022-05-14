import userController from '../controllers/user.controller';
import {AuthMiddleware as auth} from '../../../../lib/middleware';
import {AccessMiddleware as access} from '../../../../lib/middleware';
import { JWTMiddleware } from '../../../../lib/middleware';

module.exports = async (router) => {
    router.get('/user', auth.required, access.required,  await userController.getUser);
    router.get('/user/:userId', auth.required, access.required, await userController.getUserByUserId);
    router.post('/user', await userController.addUser);
    router.put('/user', auth.required, access.required,  await userController.updateUser);
    router.delete('/user/:userId', auth.required, access.required, await userController.deleteUser);
    router.post('/login', JWTMiddleware);
};