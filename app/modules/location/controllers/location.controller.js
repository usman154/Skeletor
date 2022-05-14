import locationService from "../services/location.service";
import { Api } from "../../../../lib";
import { UIDGenerator } from "../../../../utilities";

class LocationController {
  constructor() {}

  async getLocation(request, response) {
    try {
      let result = await locationService.getLocation(request);
      Api.ok(request, response, result);
    } catch (err) {
      Api.serverError(request, response, err);
    }
  }

  async getLocationByLocationId(request, response) {
    try {
      let result = await locationService.getLocationByLocationId(
        request.params.locationId
      );
      Api.ok(request, response, result);
    } catch (err) {
      Api.serverError(request, response, err);
    }
  }

  async addLocation(request, response) {
    try {
      request.body.location_id = UIDGenerator.getUniqueId(); //Will create a randon unique id
      let result = await locationService.addLocation(request.body);
      Api.added(request, response, result, "Location");
    } catch (err) {
      Api.serverError(request, response, err);
    }
  }

  async updateLocation(request, response) {
    try {
      let result = await locationService.updateLocation(request.body);
      Api.updated(request, response, result, "Location");
    } catch (err) {
      Api.serverError(request, response, err);
    }
  }

  async deleteLocation(request, response) {
    try {
      let result = await locationService.deleteLocation(
        request.params.locationId,
        request
      );
      Api.deleted(request, response, result, "Location");
    } catch (err) {
      Api.serverError(request, response, err);
    }
  }
}

export default new LocationController();
