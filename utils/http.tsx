import axios, { AxiosInstance } from "axios";

class Http {
  private static instance: AxiosInstance;

  static getInstance() {
    // console.log("Http.getInstance", Http.instance);
    if (!Http.instance) {
      Http.instance = axios.create({
        baseURL: "http://192.168.101.5:8080/api", // change ip address to your local ip address ipconfig
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Http.getInstance", Http.instance);
    }
    return Http.instance;
  }
}

const http = Http.getInstance();

export default http;
