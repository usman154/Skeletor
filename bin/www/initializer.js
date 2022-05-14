
require("../../app/config/passport");
import { RoleService } from "../../app/services";

function run(app) {
  loadPermissions();
  import('../../app/config/database').then((connection)=> {
    connection.default(app);
  })
}
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

module.exports = {
  run: run
}
