import { Database } from "../../app/config";
// require("../../app/config/passport");
import { RoleService } from "../../app/services";
async function loadPermissions() {
  let permissions = {};

  let roles = await RoleService.getAllRoles();
  if (roles.length > 0) {
    for (let i = 0; i < roles.length; i++) {
      permissions[roles[i].role_id] = roles[i].permissions;
    }
  }
  global.permissions = permissions;
}
loadPermissions();
export { loadPermissions };
