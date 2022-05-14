import mongoose from "mongoose";
import { CustomMongoose } from "../../../../lib";
// const role = mongoose.model("role");

class RoleService {
  constructor() {}

  async getRole(request) {
    let query = CustomMongoose.getRoleQuery(request);
    let response = await role.find(query);
    return response;
  }

  async getAllRoles() {
    return [];
  }

  async getRoleByRoleId(roleId) {
    let response = await role.findOne({ role_id: roleId }).lean();
    return response;
  }
}

export default new RoleService();
