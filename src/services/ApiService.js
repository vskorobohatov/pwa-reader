import { HttpService } from "./HttpService";
import { identity, pickBy } from "lodash";

export class ApiService {
  static async _requestAsync({
    url,
    method = "GET",
    data = {},
    headers = {},
    responseType = "json",
    withCredentials = true,
    config: customConfig,
    params,
    customUrl
  }) {
    const accessToken = localStorage.getItem("access_token");
    const config = customConfig || {
      protocol: process.env.REACT_APP_SERVER_APP_PROTOCOL || window.location.protocol.replace(':', '') || "http",
      hostname: process.env.REACT_APP_SERVER_APP_HOSTNAME || window.location.host
    };

    return HttpService.requestAsync({
      url: customUrl || (config.hostname && config.protocol ? `${config.protocol}://${config.hostname}/api/v1${url}` : `api/v1${url}`),
      method,
      data,
      responseType,
      params: pickBy(params, x => identity(x)),
      headers: withCredentials ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...headers
      } : {
        "Content-Type": "application/json",
        ...headers
      }
    });
  }
}
