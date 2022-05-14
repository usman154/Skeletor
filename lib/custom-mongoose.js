
import Global from '../lib/global';
import { RoleThings } from '../utilities/data/constants';
function getBasicQuery(request) {
  let obj = { active: true }
  if (!Global.superAdmin(request.userInfo.role.role_id)) {
    const { headers: { location } } = request;
    let locationId = location.split(' ')[1];
    obj.location_id = locationId
  }
  return obj;
}

const CustomMongoose = {
  getRoleQuery: (request) => {
    let query ={ active: true };
    let excludeRoles = [RoleThings.SUPER_ADMIN_ROLE_ID];
    if (!Global.superAdmin(request.userInfo.role.role_id)) {
      excludeRoles.push(RoleThings.PRIMARY_NETWORK_MANAGER_ROLE_ID);
    } 
    query.role_id = { $nin:excludeRoles };
    return query;
  },
  getUserQuery: (request) => {
    let query = getBasicQuery(request);
    query.role_id = { $nin: [RoleThings.SUPER_ADMIN_ROLE_ID] };
    return query;
  },
  getLocationQuery: (request) => {
    let query = getBasicQuery(request);
    return query;
  }
}

export default CustomMongoose;
