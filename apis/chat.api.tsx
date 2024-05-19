import { useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";

// lấy thông tin chat room
export const getChatDetailApi = (token, chatRoomId) => {
  return http.get(`/v1/chats/${chatRoomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// xem tin nhắn
export const createChatRoomApi = (token, chatid) => {
  return http.put(
    `/v1/chats/${chatid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// lấy tin nhắn phòng chat
export type getChatRoomRequest = {
  chatid: string;
  page?: number;
  size?: number;
  content?: string;
};
export const getChatRoomApi = (token, data: getChatRoomRequest) => {
  const { chatid, ...rest } = data;
  return http.get(`/v1/chats/${data.chatid}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: rest,
  });
};

export const getListChatRoomApi = (token) => {
  return http.get("/v1/users/profile/chats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessageToServerApi = (token, chatRoomId, formdata) => {
  return http.post(`/v1/chats/${chatRoomId}/messages`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMessageApi = (token, chatRoomId, messageId) => {
  return http.delete(`/v1/chats/${chatRoomId}/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unsentMessageApi = (token, chatRoomId, messageId) => {
  return http.put(
    `/v1/chats/${chatRoomId}/messages/${messageId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getLinkuploadApi = (token, file) => {
  return http.post(`/v1/files`, file, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export type addReactionRequest = {
  chatRoomId: string;
  messageId: string;
  type: "LIKE" | "LOVE" | "CRY" | "ANGER" | "WOW";
  quantity: 1;
};
export const addReactionApi = (token, data: addReactionRequest) => {
  console.log("data", data);
  const { chatRoomId, messageId, ...rest } = data;
  console.log("rest", rest);
  return http.put(
    `/v1/chats/${chatRoomId}/messages/${messageId}/reaction`,
    rest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// ghim tin nhắn
export type pinMessageRequest = {
  chatRoomId: string;
  messageId: string;
};

export const pinMessageApi = (token, data: pinMessageRequest) => {
  return http.put(
    `/v1/chats/${data.chatRoomId}/messages/${data.messageId}/pin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
