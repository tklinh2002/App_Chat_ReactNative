import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { formatTime } from "../../utils/format";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
const ObjectChat = ({ chatRoom, navigation }) => {
  const handPress = () => {
    console.log(chatRoom);
    navigation.navigate("Chat", { chatRoom: chatRoom });
  };

  return (
    <View>
      <TouchableOpacity style={styles.object} onPress={handPress}>
        {chatRoom?.avatar !== null ? (
          <Image
            style={styles.img}
            source={{
              uri: chatRoom?.avatar,
            }}
          />
        ) : (
          <Image
            style={styles.img}
            source={require("../../assets/images/images.jpg")}
          />
        )}

        {chatRoom?.isGroup && (
          <IconFontAwesome
            style={{ marginHorizontal: 5 }}
            name="group"
            size={15}
            color="gray"
          />
        )}
        <View style={{ width: "65%" }}>
          {/* thay đổi tên  */}
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {chatRoom?.name}
          </Text>
          {chatRoom?.lastMessage?.messageId === chatRoom?.lastSeenMessageId ? (
            <Text>{chatRoom?.lastMessage?.content}</Text>
          ) : (
            <Text style={{ fontWeight: "bold" }}>
              {chatRoom?.lastMessage?.content}
            </Text>
          )}
        </View>
        <Text style={{ marginRight: 5 }}>
          {formatTime(chatRoom?.lastMessage?.createdAt)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  object: {
    height: 80,
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
});
export default ObjectChat;
