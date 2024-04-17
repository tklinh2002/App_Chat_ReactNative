import http from "../utils/http";

export const createGroupApi = (token, infoGroup) =>
  http.post("/v1/groups",infoGroup ,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// lấy danh sách nhóm
export const getListGroupApi = (token) =>
  http.get("/v1/users/profile/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
