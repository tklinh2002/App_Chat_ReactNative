import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { white } from "../../assets/colors";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { ResizeMode, Video } from "expo-av";
import ChildrenModalForwadMess from "./modalForwardMess";
import { formatTimeMess } from "../../utils/format";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { addReactionRequest } from "../../apis/chat.api";
type EmojiType = "LIKE" | "LOVE" | "CRY" | "ANGER" | "WOW";
type EmojiCountMap = Map<EmojiType, number>;
const ReceiveChat = ({ item, isSameUser, onDeleteMessage, onAddEmoji }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleForward, setModalVisibleForward] = useState(false);
  const [modalEmoji, setModalEmoji] = useState(false);
  const [countEmojis, setCountEmoji] = useState<EmojiCountMap>(new Map());
  useEffect(() => {
    countEmojis.clear();
    const countEmoji = new Map(countEmojis);
    if (item.status != "UNSEND" && item.reactions.length > 0) {
      item.reactions.forEach((item) => {
        if (countEmoji.has(item.type)) {
          countEmoji.set(item.type, countEmoji.get(item.type) + item.quantity);
        } else {
          countEmoji.set(item.type, item.quantity);
        }
      });
      setCountEmoji(countEmoji);
    }
  }, [item]);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handDelete = () => {
    onDeleteMessage(item.messageId);
    console.log("Delete");
    closeModal();
  };
  const handleAddEmoji = (type) => {
    const data: addReactionRequest = {
      messageId: item.messageId,
      chatRoomId: null,
      quantity: 1,
      type: type,
    };
    onAddEmoji(data);
    setModalEmoji(false);
  };
  const closeModalEmoji = () => {
    setModalEmoji(false);
  };
  return (
    <TouchableOpacity style={styles.chat} onLongPress={openModal}>
      {/* text  */}
      <View style={{ flexDirection: "row" }}>
        {!isSameUser ? (
          <React.Fragment>
            {item.sender.thumbnailAvatar !== null &&
            item.sender.thumbnailAvatar !== "" ? (
              <Image
                style={styles.img}
                source={{
                  uri: item.sender.thumbnailAvatar,
                }}
              />
            ) : (
              <Image
                style={styles.img}
                source={require("../../assets/images/images.jpg")}
              />
            )}
          </React.Fragment>
        ) : (
          <View style={styles.img}></View>
        )}

        {/* text */}
        {item.content !== "" && (
          <View style={[styles.container, { maxWidth: "70%" }]}>
            <Text style={{ marginBottom: 5, opacity: 0.3 }}>
              {item?.sender?.firstName + " " + item?.sender?.lastName}
            </Text>
            <Text
              style={
                item.status == "UNSEND"
                  ? { fontSize: 17, marginHorizontal: "3%", color: "#8A8A8A" }
                  : { fontSize: 17, marginHorizontal: "3%" }
              }
            >
              {item?.content}
            </Text>
            <Text style={{ marginTop: 5, opacity: 0.3, fontSize: 12 }}>
              {formatTimeMess(item?.createdAt)}
            </Text>
          </View>
        )}
      </View>

      {/* Hiển thị hình ảnh video nếu không phải unsend */}
      {item.status != "UNSEND" && (
        <>
          {item.content === "" && (
            <Text style={{ marginBottom: 5, opacity: 0.3 }}>
              {item?.sender?.firstName + " " + item?.sender?.lastName}
            </Text>
          )}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: "7%" }}
          >
            {!(item.attachments == null) && (
              <>
                {[...item.attachments].map((item) => (
                  <View key={item.url}>
                    {item.type === "IMAGE" ? (
                      <TouchableOpacity>
                        <Image
                          source={{ uri: item.url }}
                          style={{ width: 200, height: 200 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ) : item.type === "VIDEO" ? (
                      <TouchableOpacity>
                        <Video
                          source={{ uri: item.url }}
                          style={{ width: 200, height: 200 }}
                          useNativeControls={true}
                          resizeMode={ResizeMode.CONTAIN}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          width: 80,
                          height: 80,
                          margin: 5,
                          alignItems: "center",
                        }}
                        onPress={() => Linking.openURL(item.url)}
                      >
                        <IconAntDesign name="file1" size={60} />
                        <Text style={{ fontSize: 10 }} numberOfLines={2}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>
        </>
      )}
      {/* emoji */}
      {item.status != "UNSEND" && (
        <View style={styles.emoji}>
          <View style={{ flexDirection: "row" }}>
            {countEmojis.size > 0 ? (
              <>
                {Array.from(countEmojis.entries()).map(([key, value]) => {
                  if (key == "LIKE")
                    return (
                      <TouchableOpacity
                        onPress={() => setModalEmoji(true)}
                        key={key}
                      >
                        <Image
                          source={require("../../assets/emoji/like.jpg")}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  if (key == "WOW")
                    return (
                      <TouchableOpacity
                        onPress={() => setModalEmoji(true)}
                        key={key}
                      >
                        <Image
                          source={require("../../assets/emoji/fun.jpg")}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  if (key == "LOVE")
                    return (
                      <TouchableOpacity
                        onPress={() => setModalEmoji(true)}
                        key={key}
                      >
                        <Image
                          source={require("../../assets/emoji/heart.jpg")}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  if (key == "CRY")
                    return (
                      <TouchableOpacity
                        onPress={() => setModalEmoji(true)}
                        key={key}
                      >
                        <Image
                          source={require("../../assets/emoji/sad.jpg")}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  if (key == "ANGER")
                    return (
                      <TouchableOpacity
                        onPress={() => setModalEmoji(true)}
                        key={key}
                      >
                        <Image
                          source={require("../../assets/emoji/angry.jpg")}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    );
                })}
              </>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                }}
                onPress={() => setModalEmoji(true)}
              >
                <IconAntDesign name="like2" size={15} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Modal ooption */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View
            style={[
              styles.container,
              { borderWidth: 1, borderColor: "black", width: "100%" },
            ]}
          >
            <Text
              style={
                item.status == "UNSEND"
                  ? { fontSize: 17, marginHorizontal: "3%", color: "#8A8A8A" }
                  : { fontSize: 17, marginHorizontal: "3%" }
              }
            >
              {item?.content}
            </Text>
          </View>
          {/* Your modal content here */}
          <TouchableOpacity style={{ marginVertical: 5 }} onPress={handDelete}>
            <Button>Xóa tin nhắn</Button>
          </TouchableOpacity>
          {item.status != "UNSEND" && (
            <TouchableOpacity
              style={{ marginVertical: 5 }}
              onPress={() => {
                setModalVisible(false);
                setModalVisibleForward(true);
              }}
            >
              <Button>Chuyển tiếp tin nhắn</Button>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {/* forward message */}
      <Modal
        visible={modalVisibleForward}
        animationType="slide"
        transparent={true}
      >
        <ChildrenModalForwadMess
          setModalVisible={setModalVisibleForward}
          item={item}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEmoji}
        onRequestClose={closeModalEmoji}
      >
        <TouchableWithoutFeedback onPress={closeModalEmoji}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContainer, { flexDirection: "row" }]}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {countEmojis.get("LIKE")}
            </Text>
            <TouchableOpacity onPress={() => handleAddEmoji("LIKE")}>
              <Image
                source={require("../../assets/emoji/like.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {countEmojis.get("LOVE")}
            </Text>
            <TouchableOpacity onPress={() => handleAddEmoji("LOVE")}>
              <Image
                source={require("../../assets/emoji/heart.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {countEmojis.get("WOW")}
            </Text>
            <TouchableOpacity onPress={() => handleAddEmoji("WOW")}>
              <Image
                source={require("../../assets/emoji/fun.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {countEmojis.get("CRY")}
            </Text>
            <TouchableOpacity onPress={() => handleAddEmoji("CRY")}>
              <Image
                source={require("../../assets/emoji/sad.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {countEmojis.get("ANGER")}
            </Text>
            <TouchableOpacity onPress={() => handleAddEmoji("ANGER")}>
              <Image
                source={require("../../assets/emoji/angry.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: 12,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
  chat: {
    marginVertical: 6,
    transform: [{ scaleY: -1 }],
  },
  modalContainer: {
    position: "absolute",
    bottom: "10%",
    left: 0,
    width: "70%",
    backgroundColor: white, // Adjust as needed
    borderRadius: 8,
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  emoji: {
    position: "absolute",
    bottom: -8,
    left: 50,
  },
});
export default ReceiveChat;
