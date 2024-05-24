import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import Header from "../components/headerFind";
import Icon from "react-native-vector-icons/Ionicons";
import { white, backgroundHeader } from "../../assets/colors";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-elements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatDetailApi } from "../../apis/chat.api";
import { useEffect, useState } from "react";
import { removeFriendApi } from "../../apis/user.api";
import { Button } from "react-native-paper";
import IconFeather from "react-native-vector-icons/Feather";
import { CheckBox } from "@rneui/themed";
import ChildrenModal from "../listGroupScreen/childrenModal";
import ModalCreateGroup from "./modalCreateGroup";
import ModalAddUserIntoGroup from "./modalAddUserIntoGroup";
const OptionScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [user, setUser] = useState(null);
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [groupToAdd, setGroupToAdd] = useState([]);
  const [modalCreateGroup, setModalCreateGroup] = useState(false);
  const getChatDetail = useQuery({
    queryKey: ["chatDetail", token, item.id],
    queryFn: () =>
      getChatDetailApi(token, item.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err["response"].data.detail)),
  });

  useEffect(() => {
    if (getChatDetail.data) {
      const user = getChatDetail.data.members.filter(
        (user) => user.id !== userID
      );
      setUser(user[0]);
    }
  }, [getChatDetail.data]);
  if (getChatDetail.isLoading) {
    return <Text>Loading...</Text>;
  }
  const handleRemoveFriend = async () => {
    try {
      const friendId = user?.id;
      const res = await removeFriendApi(token, friendId);
      console.log("Xóa kết bạn thành công:", res);
      Alert.alert("Thông báo", res.data);
    } catch (error) {
      console.error("Lỗi khi xóa kết bạn:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa kết bạn");
    }
  };

  const handTrash = () => {};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHeader}>
        <Avatar
          size="xlarge"
          rounded
          title="G"
          source={{
            uri: user?.thumbnailAvatar || null,
          }}
        />
        <Text style={{ fontSize: 20 }}>
          {user?.firstName + " " + user?.lastName}
        </Text>
        <View style={styles.containerIcon}>
          <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
            <View style={styles.icon}>
              <IconSimpleLineIcons name="magnifier" color="black" size={20} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              Tìm tin nhắn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
            <View style={styles.icon}>
              <IconAntDesign name="user" color="black" size={20} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              Trang cá nhân
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerList}>
        <TouchableOpacity
          style={styles.objectList}
          onPress={() => setModalCreateGroup(true)}
        >
          <IconAntDesign name="addusergroup" color="black" size={25} />
          <Text style={styles.text}>{"Tạo nhóm với " + user?.lastName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.objectList}
          onPress={() => setModalAddGroup(true)}
        >
          <IconAntDesign name="adduser" color="black" size={25} />
          <Text style={styles.text}>
            {"Thêm " + user?.lastName + " vào nhóm"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handTrash}>
          <IconSimpleLineIcons name="trash" color="black" size={25} />
          <Text style={styles.text}>{"Xóa lịch sử trò chuyện"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.objectList}
          onPress={handleRemoveFriend}
        >
          <IconSimpleLineIcons name="user-unfollow" color="black" size={25} />
          <Text style={styles.text}>Xóa bạn bè</Text>
        </TouchableOpacity>
      </View>
      {/* modal create group */}
      <Modal
        visible={modalCreateGroup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalCreateGroup(false)}
      >
        <ModalCreateGroup
          setmodalvisiable={setModalCreateGroup}
          navigation={navigation}
          friendId={user?.id}
        />
      </Modal>
      {/* modal add user into group */}
      <Modal
        visible={modalAddGroup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalAddGroup(false)}
      >
        <ModalAddUserIntoGroup
          setmodalvisiable={setModalAddGroup}
          navigation={navigation}
          friendId={user?.id}
        />
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginBottom: 10,
  },
  containerIcon: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "40%",
    marginTop: 20,
  },
  icon: {
    backgroundColor: "#E3E3E3",
    borderRadius: 40,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    marginTop: 10,
  },
  objectList: {
    backgroundColor: white,
    flexDirection: "row",
    paddingLeft: 5,
    borderBottomColor: "black",
    borderBottomWidth: 0.2,
    height: 60,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
  },
  object: {
    height: 80,
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default OptionScreen;
