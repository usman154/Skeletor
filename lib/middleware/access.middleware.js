import Global from '../global';
const access = {
    required: function (request, res, next) {
        if (Global.superAdmin(request.userInfo.role.role_id)) {
            next();
            return;
        }
        let permissions = request.userInfo.role.permissions;
        var currentPath = request.path.replace("/",'');
        var currentMethod = request.method.toUpperCase();
    
        let allowed = permissions.some((p)=>{
            let methods = [];
            if(p.read){
                methods.push('GET');
            }
            if(p.write){
                methods.push('POST','PUT','DELETE');
            }
           return p.resource == currentPath && methods.includes(currentMethod)
        }) 
        if(allowed)
        next();
        else
        next("Not allowed")
    }
}

module.exports = access