import { AppSettings } from "../../app/config";
import RoleService from "../../app/modules/role/services/role.service";
export class Utils {
  static async getUserRoles() {
    return await RoleService.getAllRoles();
  }
}
