import { ApiService } from "./ApiService";

export class User {
  static async login(data) {
    return ApiService._requestAsync({
      url: "/login",
      method: "POST",
      data
    });
  }
  static async signup(data) {
    return ApiService._requestAsync({
      url: "/login",
      method: "POST",
      data
    });
  }
}
