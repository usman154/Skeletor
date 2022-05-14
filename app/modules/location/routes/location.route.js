import locationController from '../controllers/location.controller';
import {AuthMiddleware as auth}  from '../../../../lib/middleware';
import {AccessMiddleware as access} from '../../../../lib/middleware';

module.exports = async (router) => {
    router.get('/location', auth.required, access.required, await locationController.getLocation);
    router.get('/location/:locationId', auth.required, access.required, await locationController.getLocationByLocationId);
    router.post('/location', auth.required, access.required,  await locationController.addLocation);
    router.put('/location', auth.required, access.required, await locationController.updateLocation);
    router.delete('/location/:locationId', auth.required, access.required, await locationController.deleteLocation);
}