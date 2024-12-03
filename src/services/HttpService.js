import axios from "axios";
import { getToken, removeToken } from "helpers/tokenHelper";

export class HttpService {
  static async requestAsync({ url, method = "GET", data = {}, headers = {}, responseType = "json", params }) {
    const reqOptions = {
      url,
      method,
      responseType,
      headers,
      timeout: 600000,
      data,
      params
    };
    return axios(reqOptions)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          return res.data;
        }
        return res;
      })
      .catch(e => {
        if (e?.response?.status === 401 && getToken()) {
          removeToken();
          window.location.reload();
        }
        throw e;
      });
  }
}
