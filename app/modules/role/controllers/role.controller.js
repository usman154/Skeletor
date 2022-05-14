import roleService from '../services/role.service';
import { Api } from "../../../../lib";
class RoleController {

    constructor() {}

    async getRole(request, response) {
        try {
            let result = await roleService.getRole(request);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

    async getRoleByRoleId(request, response) {
        try {
            let result = await roleService.getRoleByRoleId(request.params.roleId);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }

}

export default new RoleController;