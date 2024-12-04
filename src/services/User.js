import { ApiService } from "./ApiService";

export class User {
  static async login(data) {
    return ApiService._requestAsync({
      url: "/login.php",
      method: "POST",
      data
    });
  }
  static async signup(data) {
    return ApiService._requestAsync({
      url: "/register.php",
      method: "POST",
      data
    });
  }
  static async uploadFile(data) {
    return ApiService._requestAsync({
      url: "/addBook.php",
      method: "POST",
      data
    });
  }
  static async uploadLink(data) {
    return ApiService._requestAsync({
      url: "/addBook.php",
      method: "POST",
      data
    });
  }
  static async getBooks(data) {
    return ApiService._requestAsync({
      url: "/getBooks.php",
      method: "POST",
      data
    });
  }
  static async getBookInfo(bookId) {
    return ApiService._requestAsync({
      url: `/getBookInfo.php?bookId=${bookId}`,
      method: "GET"
    });
  }
  static async updateBookInfo(bookId) {
    return ApiService._requestAsync({
      url: `/updateBookInfo.php`,
      method: "POST",
      data: { bookId }
    });
  }
  static async deleteBook(bookId) {
    return ApiService._requestAsync({
      url: `/deleteBook.php`,
      method: "POST",
      data: { bookId }
    });
  }
}
