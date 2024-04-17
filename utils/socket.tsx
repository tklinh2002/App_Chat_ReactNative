import { over } from "stompjs";
import SockJS from "sockjs-client";
import { ip } from "./http";
let stompClient = null;

export const connectSocket = async () => {
  if (!stompClient) {
    const Sock = new SockJS(`http://${ip}:8080/api/ws`);
    stompClient = over(Sock);
  }
  return stompClient;
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
};

const checkSocketStatus = () => {
  setInterval(() => {
    if (stompClient && !stompClient.connected) {
      console.log("Socket disconnected");
    }
  }, 5000);
};
