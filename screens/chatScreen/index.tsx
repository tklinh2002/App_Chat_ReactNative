import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import SendChat from "./sendchat";
import ReceiveChat from "./receivechat";
import InputChat from "./inputChat";
import styles from "./styles";
import HeaderChat from "./header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";
import {
  addReactionRequest,
  deleteMessageApi,
  getChatRoomRequest,
  getLinkuploadApi,
  unsentMessageApi,
} from "../../apis/chat.api";
import EventChat from "./event";
import { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import http, { ip } from "../../utils/http";
import axios from "axios";
import { connectSocket, disconnectSocket } from "../../utils/socket";
import * as FileSystem from "expo-file-system";
import { FlatList } from "react-native";
import { useChats } from "../../hook/hook";
let stompClient = null;

const ChatScreen = ({ navigation, route }) => {
  const { chatRoom } = route.params;
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState<getChatRoomRequest>({
    chatid: chatRoom?.id,
    page: 0,
    size: 30,
  });
  const [page, setPage] = useState(0);
  const { getChatRoom, addReaction } = useChats(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChatRoom.refetch();
        if (response.data) {
          setMessages((prevMessages) => [
            ...prevMessages,
            ...response.data.data?.content.reverse(),
          ]);
          setPage(response.data?.data?.totalPages - 1);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, [data.page]);
  const [chat, setChat] = useState({
    chatId: chatRoom?.id,
    content: "",
    sender: userID,
    connected: false,
  });
  useEffect(() => {
    const fetchDataAndConnect = async () => {
      try {
        console.log("connectSocket", "connectSocket");
        console.log("stompClient", stompClient);
        if (stompClient == null) {
          stompClient = await connectSocket();

          try {
            await stompClient.connect({}, async () => {
              console.log("connect", "connect");
              await stompClient.subscribe(
                "/chatroom/" + chat?.chatId,
                onPrivateMessageReceived
              );
            });
          } catch (error) {
            throw new Error("Socket connection error");
          }
        }
      } catch (error) {
        console.error("Socket connection error:", error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["chatRoom", chatRoom.id],
      });
    };
    fetchDataAndConnect();
    return () => {
      if (stompClient) {
        disconnectSocket();
        stompClient = null;
        setChat({ ...chat, connected: false });
      }
    };
  }, []);

  const onPrivateMessageReceived = async (payload) => {
    console.log("onPrivateMessageReceived", "payload");
    const data = (await JSON.parse(payload.body)) as any;
    console.log("onPrivateMessageReceived", data);
    setMessages((prevMessages) => {
      const messageIndex = prevMessages.findIndex(
        (message) => message.messageId === data.messageId
      );

      if (messageIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex] = data;
        return updatedMessages;
      } else {
        return [data, ...prevMessages];
      }
    });
  };
  const handleSendMessage = async (message, media, document) => {
    const attachments = [];
    await Promise.all(
      media.map(async (item) => {
        const res = await getLinkuploadApi(token, {
          filename: item?.fileName,
          type: "MESSAGE",
        });
        const arrayBuffer = await decode(item.base64);
        const resUpload = await axios
          .put(res.data, arrayBuffer)
          .then(async (res2) => {
            const newUrl = res.data.substring(0, res.data.indexOf("?"));
            attachments.push({
              type: item.type.toUpperCase(),
              url: newUrl,
              filename: newUrl.split("/")[newUrl.split("/").length - 1],
            });
          })
          .catch((e) => console.log(e));
      })
    );
    await Promise.all(
      document.map(async (item) => {
        const res = await getLinkuploadApi(token, {
          filename: item?.name,
          type: "MESSAGE",
        });
        const link = await res.data;

        const fileData = await FileSystem.readAsStringAsync(item.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const arrayBuffer = await decode(fileData);
        const resUpload = await axios
          .put(link, arrayBuffer)
          .then(async (res2) => {
            const newUrl = res.data.substring(0, res.data.indexOf("?"));
            console.log("newUrl", newUrl);
            attachments.push({
              type: "FILE",
              url: newUrl,
              filename: newUrl.split("/")[newUrl.split("/").length - 1],
            });
          })
          .catch((e) => console.log(e));
      })
    );

    await setChat({ ...chat, content: message });
    stompClient.send(
      "/app/chat/" + chat.chatId,
      {},
      JSON.stringify({ sender: chat.sender, content: message, attachments })
    );
  };

  const handleDeleteMessage = async (messageId) => {
    // console.log("delete message", chat.connected);
    const res = await deleteMessageApi(token, chatRoom.id, messageId);
    if (res.status != 200) {
      Alert.alert("Error", res.data.detail);
      return;
    }
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.messageId !== messageId)
    );
  };
  const handleUnsentMessage = async (messageId) => {
    const res = await unsentMessageApi(token, chatRoom.id, messageId);
  };
  const handleAddEmoji = async (data: addReactionRequest) => {
    data.chatRoomId = chatRoom.id;
    await addReaction.mutateAsync(data);
  };
  if (getChatRoom.isLoading)
    return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={2}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <HeaderChat item={chatRoom} navigation={navigation} />
      </View>

      <FlatList
        initialNumToRender={10}
        style={styles.bodyChat}
        data={messages}
        keyExtractor={(item) => item.messageId}
        renderItem={({ item, index }) => {
          if (item.type === "EVENT") {
            return <EventChat item={item} key={item.messageId} />;
          } else {
            if (item?.sender?.id === userID) {
              return (
                <SendChat
                  key={item.messageId}
                  item={item}
                  onDeleteMessage={handleDeleteMessage}
                  onUnsentMessage={handleUnsentMessage}
                  onAddEmoji={handleAddEmoji}
                />
              );
            } else {
              const nextMessageSender = messages[index + 1]?.sender?.id;
              return (
                <ReceiveChat
                  key={item.messageId}
                  item={item}
                  isSameUser={nextMessageSender === item?.sender?.id}
                  onDeleteMessage={handleDeleteMessage}
                  onAddEmoji={handleAddEmoji}
                />
              );
            }
          }
        }}
        onEndReached={async () => {
          console.log("page", page);
          console.log("data.data", data.page);
          console.log("getChatRoom.isRefetching", getChatRoom.isRefetching);
          console.log(
            "condition",
            !getChatRoom.isRefetching && data.page < page
          );
          if (!getChatRoom.isRefetching && data.page < page) {
            setData({ ...data, page: data.page + 1 });
            console.log("load");
          }
        }}
        ListFooterComponent={
          getChatRoom.isRefetching ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
      <View>
        <InputChat onSendMessage={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
