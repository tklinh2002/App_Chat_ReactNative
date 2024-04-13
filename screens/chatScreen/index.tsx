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
import base64 from 'react-native-base64'

import {
  deleteMessageApi,
  getChatRoomApi,
  getLinkuploadApi,
  unsentMessageApi,
} from "../../apis/chat.api";
import EventChat from "./event";
import { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import http, { ip } from "../../utils/http";
import axios from "axios";
let stompClient = null;
let isConnected = false;
const ChatScreen = ({ route }) => {
  const { chatRoom } = route.params;
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [messages, setMessages] = useState([]);

  // socket
  const [chat, setChat] = useState({
    chatId: chatRoom.id,
    content: "",
    sender: userID,
    connected: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      // Kết nối với máy chủ WebSocket khi component được mount
      if (!isConnected) {
        await connectSocket();
        isConnected = true;
      }
      await queryClient.invalidateQueries({
        queryKey: ["chatRoom", chatRoom.id],
      });
    };

    fetchData();

    return () => {
      queryClient.invalidateQueries({ queryKey: ["getListChatRoom"] });
    };
  }, []);
  const getChatRoom = useQuery({
    queryKey: ["chatRoom", chatRoom.id],
    queryFn: () =>
      getChatRoomApi(token, chatRoom.id)
        .then((res) => {
          setMessages([...res.data].reverse());
          return res.data;
        })
        .catch((err) => console.log(err["response"])),
  });
  const connectSocket = async () => {
    let Sock = new SockJS(`http://${ip}:8080/api/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, (error) => console.log(error));
  };
  const onConnected = () => {
    setChat({ ...chat, connected: true });
    stompClient.subscribe("/chatroom/" + chat.chatId, onPrivateMessageReceived);
  };
  const onPrivateMessageReceived = async (payload) => {
    const data = (await JSON.parse(payload.body)) as any;
    await setMessages((prevMessages) => {
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
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
  const handleSendMessage = async (message, media) => {
    // console.log(media);
    // return
    const attachments = [];
    // get link upload
    media.forEach(async (item) => {
      const res = await getLinkuploadApi(token, {
        filename: item?.fileName,
        type: "MESSAGE",
      }).then(async (res) => {
        // console.log(res.data);
        // upload file
        const formdata = new FormData();
        formdata.append("file",{
          uri: item.uri,
          type: item.mimeType,
          name: item.fileName,
        });
        // return
        // const file = atob(item.base64)
        // const binaryData = await base64.encode(item.base64)
        // console.log("binary "+ binaryData)
        const resUpload = await axios
          .put(res.data, item.uri,{
            
          })
          .catch((e) => console.log(e))
          .then(async (res2) => {
            const newUrl = await res.data.substring(0, res.data.indexOf("?"));
            console.log("newUrl" + newUrl);
            await attachments.push({
              type: item.type.toUpperCase(),
              url: newUrl,
              filename: newUrl.split("/")[newUrl.split("/").length - 1],
            });
          });
        return res.data.url;
      });
    });
    return
    // gửi text
    await setChat({ ...chat, content: message });
    stompClient.send(
      "/app/chat/" + chat.chatId,
      {},
      JSON.stringify({ sender: chat.sender, content: message, attachments })
    );
  };
  const handleDeleteMessage = async (messageId) => {
    const res = await deleteMessageApi(token, chatRoom.id, messageId);
    if (res.status != 200) {
      Alert.alert("Error", res.data.detail);
      return;
    }
    console.log(res.data);
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.messageId !== messageId)
    );
  };
  const handleUnsentMessage = async (messageId) => {
    const res = await unsentMessageApi(token, chatRoom.id, messageId);
    if (res.status === 200) {
      setMessages((prevMessages) => {
        // Find the index of the message with the given messageId
        const messageIndex = prevMessages.findIndex(
          (message) => message.messageId === messageId
        );

        // If the message with the given messageId is found, update it
        if (messageIndex !== -1) {
          const updatedMessages = [...prevMessages];
          updatedMessages[messageIndex] = res.data;
          return updatedMessages;
        } else {
          // If the message with the given messageId is not found, add it to the end of the array
          return [...prevMessages, res.data];
        }
      });
    }
  };
  //
  if (getChatRoom.isLoading)
    return <ActivityIndicator size="large" color="#0000ff" />;
  else {
    // console.log(messages);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={2}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <HeaderChat item={chatRoom} />
      </View>

      <ScrollView style={styles.bodyChat}>
        {messages.map((item, index) => {
          if (item.type == "EVENT") {
            return <EventChat key={item.messageId} item={item} />;
          } else {
            if (item.sender.id == userID) {
              return (
                <SendChat
                  key={item.messageId}
                  item={item}
                  onDeleteMessage={handleDeleteMessage}
                  onUnsentMessage={handleUnsentMessage}
                />
              );
            } else {
              if (messages[index - 1]?.sender.id == item.sender.id)
                return (
                  <ReceiveChat
                    key={item.messageId}
                    item={item}
                    isSameUser={false}
                    onDeleteMessage={handleDeleteMessage}
                  />
                );
              else
                return (
                  <ReceiveChat
                    key={item.messageId}
                    item={item}
                    isSameUser={true}
                    onDeleteMessage={handleDeleteMessage}
                  />
                );
            }
          }
        })}
      </ScrollView>
      <View>
        <InputChat onSendMessage={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
