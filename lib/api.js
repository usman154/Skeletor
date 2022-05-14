"use strict";
import { Logger } from "../app/config";
let _hasOwnProperty = Object.prototype.hasOwnProperty;

const Status = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNSUPPORTED_ACTION: 405,
  VALIDATION_FAILED: 422,
  SERVER_ERROR: 500,
  ADDED: 201,
};

function statusMessage(status) {
  switch (status) {
    case Status.BAD_REQUEST:
      return "Bad Request";
    case Status.UNAUTHORIZED:
      return "Unauthorized";
    case Status.FORBIDDEN:
      return "Forbidden";
    case Status.NOT_FOUND:
      return "Not Found";
    case Status.UNSUPPORTED_ACTION:
      return "Unsupported Action";
    case Status.VALIDATION_FAILED:
      return "Validation Failed";
    case Status.SERVER_ERROR:
      return "Internal Server Error";
    case Status.ADDED:
      return "Added";
  }
}

const jsonResponse = (res, body, options) => {
  options = options || {};
  options.status = options.status || Status.OK;
  res.status(options.status).json(body || null);
};
const xmlResponse = (res, xml, options) => {
  options = options || {};
  options.status = options.status || Status.OK;
  res.status(options.status);
  res.header("Content-Type", "text/xml").send(xml);
};
const meta = (req, res, source, action) => ({
  transId: req.get("x-transid"),
  transParentId: "not mendatory",
  status: "0000",
  source: source || "DB",
  action: action || "DB",
  description: "Success",
  responseTime: new Date(),
});

const Api = {
  ok: (req, res, data, source) => {
    jsonResponse(res, data);
  },
  badRequest: function(req, res, errors) {
    errors = Array.isArray(errors) ? errors : [errors];
    let response = {
      responseMetaData: meta(req),
      exception: errors,
    };
    jsonResponse(res, response, {
      status: Status.BAD_REQUEST,
    });
  },
  unauthorized: function(req, res, error) {
    let body = {
      error: error,
    };

    jsonResponse(res, body, {
      status: Status.UNAUTHORIZED,
    });
  },

  forbidden: function(req, res) {
    let body = {
      message: statusMessage(Status.FORBIDDEN),
    };

    jsonResponse(res, body, {
      status: Status.FORBIDDEN,
    });
  },
  notFound: function(req, res, body = undefined) {
    if (!body)
      body = {
        message: statusMessage(Status.NOT_FOUND),
      };
    jsonResponse(res, body, {
      status: Status.NOT_FOUND,
    });
  },

  unsupportedAction: function(req, res) {
    let body = {
      message: statusMessage(Status.UNSUPPORTED_ACTION),
    };

    jsonResponse(res, body, {
      status: Status.UNSUPPORTED_ACTION,
    });
  },

  invalid: function(req, res, errors) {
    errors = Array.isArray(errors) ? errors : [errors];

    let body = {
      message: statusMessage(Status.VALIDATION_FAILED),
      errors: errors,
    };

    jsonResponse(res, body, {
      status: Status.VALIDATION_FAILED,
    });
  },
  serverError: (req, res, error) => {
    let maskError = false;
    if (error instanceof Error) {
      error = {
        message: error.message,
        stacktrace: error.stack,
      };
      maskError = true;
    }
    Logger.error(error);
    if (maskError) {
      error = "System can not process the request";
    }
    const response = {
      responseMetaData: meta(req),
      exception: error,
    };

    jsonResponse(res, response, {
      status: Status.SERVER_ERROR,
    });
  },
  requireParams: function(req, res, params, next) {
    let missing = [];

    params = Array.isArray(params) ? params : [params];

    params.forEach(function(param) {
      if (
        !(req.body && _hasOwnProperty.call(req.body, param)) &&
        !(req.params && _hasOwnProperty.call(req.params, param)) &&
        !_hasOwnProperty.call(req.query, param)
      ) {
        missing.push("Missing required parameter: " + param);
      }
    });

    if (missing.length) {
      Api.badRequest(req, res, missing);
    } else {
      next();
    }
  },
  added(req, res, data = undefined, source = undefined) {
    const response = {
      responseMetaData: meta(req, res, source, "Added"),
    };
    if (data) {
      response.response = data;
    }
    jsonResponse(res, response, {
      status: Status.OK,
    });
  },
  updated(req, res, data = undefined, source = undefined) {
    const response = {
      responseMetaData: meta(req, res, source, "Updated"),
    };
    if (data) {
      response.response = data;
    }
    jsonResponse(res, response, {
      status: Status.OK,
    });
  },
  replaced(req, res, data = undefined, source = undefined) {
    const response = {
      responseMetaData: meta(req, res, source, "Replaced"),
    };
    if (data) {
      response.response = data;
    }
    jsonResponse(res, response, {
      status: Status.OK,
    });
  },
  deleted(req, res, data = undefined, source = undefined) {
    const response = {
      responseMetaData: meta(req, res, source, "Deleted"),
    };
    if (data) {
      response.response = data;
    }
    jsonResponse(res, response, {
      status: Status.OK,
    });
  },
  success(req, res, data = undefined, source = undefined, message = "Success") {
    const response = {
      responseMetaData: meta(req, res, source, message),
    };
    if (data) {
      response.response = data;
    }
    jsonResponse(res, response, {
      status: Status.OK,
    });
  },
  requireHeaders: function(req, res, headers, next) {
    let missing = [];

    headers = Array.isArray(headers) ? headers : [headers];

    headers.forEach(function(header) {
      if (!(req.headers && _hasOwnProperty.call(req.headers, header))) {
        missing.push("Missing required header parameter: " + header);
      }
    });

    if (missing.length) {
      Api.badRequest(req, res, missing);
    } else {
      next();
    }
  },
};

export default Api;
