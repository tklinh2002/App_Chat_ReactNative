import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReactionApi,
  addReactionRequest,
  getChatRoomApi,
  getChatRoomRequest,
} from "../apis/chat.api";
import {
  addMemberToGroupApi,
  changeRoleMemberInGroupApi,
  deleteGroupApi,
  deleteMemberInGroupApi,
  getGroupInfoApi,
  getListGroupApi,
  getListMemberInGroupApi,
  updateGroupApi,
} from "../apis/group.api";
import { Alert } from "react-native";
import {
  acceptFriendApi,
  blockFriendApi,
  getListContactApi,
  rejectFriendApi,
  removeFriendApi,
  unBlockFriendApi,
} from "../apis/user.api";
import { connectSocket, disconnectSocket } from "../utils/socket";
import { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
export const useChats = (data: getChatRoomRequest) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const getChatRoom = useQuery({
    queryKey: ["chatRoom", data.chatid],
    queryFn: () => getChatRoomApi(token, data),
  });
  const addReaction = useMutation({
    mutationKey: ["addReaction"],
    mutationFn: (data: addReactionRequest) => addReactionApi(token, data),
  });
  return { getChatRoom, addReaction };
};

export const useGroup = (groupid?: string) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];

  // Hook sử dụng react-query để lấy danh sách nhóm từ API
  const listGroupData = useQuery({
    queryKey: ["listGroup"],
    queryFn: () => getListGroupApi(token),
  });

  // Hook sử dụng react-query để lấy thông tin của một nhóm từ API
  const getGroupInfo = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfoApi(token, groupid),
  });

  // Hook sử dụng react-query để thêm thành viên vào nhóm
  type addMemberToGroupRequest = {
    groupid: string;
    listmembers: string[];
  };
  const addMemberToGroup = useMutation({
    mutationKey: ["addMemberToGroup"],
    mutationFn: (data: addMemberToGroupRequest) =>
      addMemberToGroupApi(token, data.groupid, data.listmembers),
  });

  // Hook sử dụng react-query để lấy danh sách thành viên trong một nhóm từ API
  const getListMemberInGroup = useQuery({
    queryKey: ["listMemberInGroup", groupid],
    queryFn: () => getListMemberInGroupApi(token, groupid),
  });
  type updateGroupRequest = {
    groupid: string;
    infoGroup: {
      name: string;
      thumbnailAvatar: string;
    };
  };
  // Hook sử dụng react-query để cập nhật thông tin của một nhóm
  const updateGroup = useMutation({
    mutationKey: ["updateGroup"],
    mutationFn: (data: updateGroupRequest) =>
      updateGroupApi(token, data.groupid, data.infoGroup),
    onSuccess: async () => {
      await listGroupData.refetch();
    },
  });
  // giaỉ tán nhóm
  // Giải tán nhóm. Chức năng này chỉ dành cho nhóm trưởng role="GROUP_LEADER"
  // Hook sử dụng react-query để giải tán một nhóm
  const deleteGroup = useMutation({
    mutationKey: ["deleteGroup"],
    mutationFn: (groupid) => deleteGroupApi(token, groupid),
  });

  type deleteMemberInGroupRequest = {
    groupid: string;
    memberid: string;
  };
  // Hook sử dụng react-query để xóa một thành viên khỏi nhóm
  const deleteMemberInGroup = useMutation({
    mutationKey: ["deleteMemberInGroup"],
    mutationFn: (data: deleteMemberInGroupRequest) =>
      deleteMemberInGroupApi(token, data.groupid, data.memberid),
    onSuccess: async () => {
      await getListMemberInGroup.refetch();
    },
  });

  // Hook sử dụng react-query để rời khỏi một nhóm
  const leaveGroup = useMutation({
    mutationKey: ["leaveGroup"],
    mutationFn: (groupid) => deleteMemberInGroupApi(token, groupid, token),
    onSuccess: async () => {
      await listGroupData.refetch();
    },
  });
  // thay đổi role của thành viên trong nhóm
  // chi nhom truong moi co quyen thuc hien chuc nang nay
  type changeRoleMemberInGroupRequest = {
    groupid: string;
    memberid: string;
    role: "GROUP_LEADER" | "DEPUTY_GROUP_LEADER" | "MEMBER";
  };
  const changeRoleMemberInGroup = useMutation({
    mutationKey: ["changeRoleMemberInGroup"],
    mutationFn: (data: changeRoleMemberInGroupRequest) =>
      changeRoleMemberInGroupApi(token, data.groupid, data.memberid, data.role),
    onSuccess: async () => {
      await getListMemberInGroup.refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    listGroupData,
    getGroupInfo,
    addMemberToGroup,
    getListMemberInGroup,
    updateGroup,
    deleteGroup,
    deleteMemberInGroup,
    leaveGroup,
    changeRoleMemberInGroup,
  };
};

export const useFriend = () => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  // Hook sử dụng react-query để lấy danh sách bạn bè từ API
  // Hook sử dụng react-query để chấp nhận lời mời kết bạn
  const acceptFriend = useMutation({
    mutationKey: ["acceptFriend"],
    mutationFn: async (freindId) => await acceptFriendApi(token, freindId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getListContact", "friend"],
      });
    },
  });
  // Hook sử dụng react-query để từ chối lời mời kết bạn
  const rejectFriend = useMutation({
    mutationKey: ["rejectFriend"],
    mutationFn: (freindId) => rejectFriendApi(token, freindId),
  });
  // Hook sử dụng react-query để chặn bạn bè
  const blockFriend = useMutation({
    mutationKey: ["blockFriend"],
    mutationFn: (freindId) => blockFriendApi(token, freindId),
  });
  // Hook sử dụng react-query để bỏ chặn bạn bè
  const unBlockFriend = useMutation({
    mutationKey: ["unBlockFriend"],
    mutationFn: (freindId) => unBlockFriendApi(token, freindId),
  });
  const removeFriend = useMutation({
    mutationKey: ["removeFriend"],
    mutationFn: (freindId) => removeFriendApi(token, freindId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getListContact", "friend"],
      });
    },
  });
  return {
    acceptFriend,
    rejectFriend,
    blockFriend,
    unBlockFriend,
    removeFriend,
  };
};
export const useSocket = () => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [subscription, setSubscription] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const {
    isLoading,
    isError,
    error,
    data: stompClient,
    refetch,
  } = useQuery({
    queryKey: ["stompClient"],
    queryFn: () => connectSocket(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({ Authorization: `Bearer ${token}` }, async () => {
        const newSubscription = await stompClient.subscribe(
          `/user/${userID}/private`,
          onPrivateMessageReceived
        );
        setSubscription(newSubscription); // Store the subscription
      });
    }

    return () => {
      if (subscription) {
        // Check if subscription exists
        subscription.unsubscribe();
      }
    };
  }, [stompClient, userID]);

  const disconnect = () => {
    if (stompClient) {
      disconnectSocket();
    }
  };

  const onPrivateMessageReceived = async (payload) => {
    const data = JSON.parse(payload.body);
    console.log("onPrivateMessageReceived", data);
    if (data.type == "FRIEND_REQUEST") {
      await queryClient.invalidateQueries({
        queryKey: ["getListContact", "request"],
      });
    }
    if(data.type == "NEW_MESSAGE"){
      await queryClient.invalidateQueries({
        queryKey: ["getListContact", "friend"],
      });
    }
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
      },
      trigger: null,
    });
    refetch(); // Gọi refetch để cập nhật dữ liệu từ server
  };

  return { isLoading, isError, error, stompClient, disconnect };
};
