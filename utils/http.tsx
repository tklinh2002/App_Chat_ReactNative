import axios, { AxiosInstance } from "axios";
const ip = "192.168.101.5:8080"
class Http {
  private static instance: AxiosInstance;
  
  static getInstance() {
    
    if (!Http.instance) {
      Http.instance = axios.create({
        baseURL: `http://${ip}/api`, // change ip address to your local ip address ipconfig
        timeout: 10000,
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
