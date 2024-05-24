import axios, { AxiosInstance } from "axios";
export const ip = "ec2-13-213-1-120.ap-southeast-1.compute.amazonaws.com";
//http://ec2-13-213-1-120.ap-southeast-1.compute.amazonaws.com:8080/api
class Http {
  private static instance: AxiosInstance;

  static getInstance() {
    if (!Http.instance) {
      Http.instance = axios.create({
        baseURL: `http://${ip}:8080/api`, // change ip address to your local ip address ipconfig
        timeout: 20000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return Http.instance;
  }
}

const http = Http.getInstance();

export default http;
