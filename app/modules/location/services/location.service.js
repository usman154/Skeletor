import mongoose from "mongoose";
import { CustomMongoose } from "../../../../lib";
// const location = mongoose.model("location");

class LocationService {
  constructor() {}

  async addLocation(data) {
    let response = await location.create(data);
    return response;
  }

  async getLocation(request) {
    let query = CustomMongoose.getLocationQuery(request);
    let response = await location.find(query);
    return response;
  }

  async getLocationByLocationId(locationId) {
    let response = await location.findOne({
      location_id: locationId,
    });
    return response;
  }

  async getLocationByCode(code) {
    let response = await location.findOne({
      code: code,
    });
    return response;
  }

  async updateLocation(data) {
    let response = await location.findOneAndUpdate(
      { location_id: data.location_id },
      data,
      { new: true }
    );
    return response;
  }

  async deleteLocation(locationId, request) {
    //TOTO: Soft delete all resources related to that location
    let data = {
      active: false,
    };
    let response = await location.findOneAndUpdate(
      { location_id: locationId },
      data,
      { new: true }
    );
    return response;
  }
}

export default new LocationService();
