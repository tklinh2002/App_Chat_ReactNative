import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput as TextInputPaper } from "react-native-paper";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BodyContact from "../contacScreen/body";
import BodyModal from "./bodyModal";
import { backgroundHeader } from "../../assets/colors";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { createGroupApi } from "../../apis/group.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const ChildrenModal = ({ setmodalvisiable, navigation }) => {
  const [listItem, setListItem] = useState([]);
  const [infoGroup, setInfoGroup] = useState({
    name: "",
    members: [],
    thumbnailAvatar:null
  });
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const createGroup = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: ()=>createGroupApi(token, infoGroup),
    onSuccess: (data) => {
      console.log(data);
      alert("Tạo nhóm thành công");
    },
    onError: (err) => {
      console.log(err["data"]["detail"]);
      alert("Tạo nhóm thất bại");
    }
  })
  const handleCreateGroup = async () => {
    createGroup.mutate();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconFeather
          name="x"
          color="black"
          size={25}
          onPress={() => setmodalvisiable(false)}
        />
        <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>Nhóm mới</Text>
        {listItem.length > 0 ? (
          <TouchableOpacity onPress={handleCreateGroup} style={styles.button}>
            <IconIonicons name="add" color="white" size={30} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.containerName}>
        <View style={styles.icon}>
          <IconFontAwesome name="camera" color="black" size={30} />
        </View>
        <TextInputPaper
          mode="flat"
          style={[styles.textInput, { backgroundColor: "white" }]}
          placeholder="Đặt tên nhóm"
          value={infoGroup.name}
          onChangeText={(text) => setInfoGroup({ ...infoGroup, name: text })}
        />
      </View>

      <View>
        <BodyModal setListItem={setListItem} navigation={navigation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 25,
  },
  header: {
    backgroundColor: "#F7F7F7",
    height: 50,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: backgroundHeader,
    alignItems: "center",
    justifyContent: "center",
  },
  containerName: {
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  containerFind: {
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    backgroundColor: "#E3E3E3",
    borderRadius: 40,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
  },
});
export default ChildrenModal;
