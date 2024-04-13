import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { white } from "../../assets/colors";
import React, { useState } from "react";
import { Button } from "react-native-paper";

const ReceiveChat = ({ item, isSameUser, onDeleteMessage }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
  return (
    <TouchableOpacity style={styles.chat} onLongPress={openModal}>
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

      <View style={styles.container}>
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
        </View>
      </Modal>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "70%",
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
    flexDirection: "row",
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
});
export default ReceiveChat;
