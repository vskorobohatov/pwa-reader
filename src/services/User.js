import { ApiService } from "./ApiService";

export class User {
  static async login(data) {
    return ApiService._requestAsync({
      url: "/auth/login",
      method: "POST",
      data
    });
  }
}
