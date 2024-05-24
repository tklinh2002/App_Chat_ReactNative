import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  SectionList,
} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput as TextInputPaper } from "react-native-paper";
import { backgroundHeader } from "../../assets/colors";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { createGroupApi } from "../../apis/group.api";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Friend from "../listGroupScreen/friend";
import ModalLoading from "../components/modalLoading";
const ModalCreateGroup = ({ setmodalvisiable, navigation, friendId }) => {
  const [listItem, setListItem] = useState([friendId]);
  const [infoGroup, setInfoGroup] = useState({
    name: "",
    thumbnailAvatar: null,
  });
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [checkedItems, setCheckedItems] = useState([friendId]);

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setContacts([
      ...(queryClient.getQueryData(["getListContact", "friend"]) as []),
    ]);
  }, []);
  // checkbox
  useEffect(() => {
    setListItem(checkedItems);
  }, [checkedItems, setListItem]);

  const handleCheckboxPress = (id, isChecked) => {
    if (id == friendId) return;
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== id)
      );
    }
  };
  // Sort contacts alphabetically by name
  const filteredContacts = contacts.filter((contact) =>
    contact.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = filteredContacts
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const initial = contact.displayName[0].toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts).map((initial) => ({
    title: initial,
    data: groupedContacts[initial],
  }));
  const handleCreateGroup = async () => {
    setIsLoading(true);
    if (infoGroup.name == "") {
      Alert.alert("Tên nhóm không được để trống");
      setIsLoading(false);
      return;
    }
    const rs = await createGroupApi(token, infoGroup, listItem)
      .then(async (res) => {
        await queryClient.invalidateQueries({ queryKey: ["getListChatRoom"] });
        await queryClient.invalidateQueries({ queryKey: ["getListGroup"] });
        setIsLoading(false);
        Alert.alert("Tạo nhóm thành công");
        await setmodalvisiable(false);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Tạo nhóm thất bại", err.response.data.detail);
      });
  };
  return (
    <View style={styles.container}>
      <ModalLoading visible={isLoading} />
      <View style={styles.header}>
        <IconFeather
          name="x"
          color="black"
          size={25}
          onPress={() => setmodalvisiable(false)}
        />
        <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>Nhóm mới</Text>
        {listItem.length > 1 ? (
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
        <View style={{ marginTop: 5 }}>
          <View style={styles.containerFind}>
            <IconMaterialCommunityIcons
              name="magnify"
              color="black"
              size={20}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Tìm kiếm bạn bè"
              placeholderTextColor={"gray"}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item?.profile?.id}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <Friend
                item={item}
                isChecked={checkedItems.includes(item.profile.id)}
                onCheckboxPress={handleCheckboxPress}
              />
            )}
          />
        </View>
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
    paddingHorizontal: 20,
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
  sectionHeader: {
    backgroundColor: "whites",
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ModalCreateGroup;
