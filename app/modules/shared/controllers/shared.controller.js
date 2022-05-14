import { Api } from "../../../../lib";
import { ResizeImage } from "../../../../utilities";
class LocationController {
  constructor() {}

  async uploadFile(request, response) {
    try {
      let result = ResizeImage.resizeOrigional(
        request.fileNameSaved,
        request.query.newfilename
      );
      Api.ok(request, response, result);
    } catch (err) {
      Api.serverError(request, response, err);
    }
  }
}

export default new LocationController();
