import userService from '../services/user.service';
import { Api } from "../../../../lib";
import { UIDGenerator } from "../../../../utilities";

class UserController {

    constructor() {}

    async getUser(request, response) {
        try {
            let result = await userService.getUser(request);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

    async getUserByUserId(request, response) {
        try {
            let result = await userService.getUserByUserId(request.params.userId);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

    async addUser(request, response) {
        try {
            request.body.user_id = UIDGenerator.getUniqueId();
            let result = await userService.addUser(request.body);
            Api.added(request, response, result, 'User');
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }
    async updateUser(request, response) {
        try {
            let result = await userService.updateUser(request.body);
            Api.updated(request, response, result, 'User');
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

    async deleteUser(request, response) {
        try {
            let result = await userService.deleteUser(request.params.userId);
            Api.deleted(request, response, result, 'User');
        } catch (e) {
            Api.serverError(request, response, err);
        }
    }
}
export default new UserController();