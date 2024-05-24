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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput as TextInputPaper } from "react-native-paper";
import { backgroundHeader } from "../../assets/colors";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  createGroupApi,
  getAllGroupFirendApi,
  getListGroupApi,
} from "../../apis/group.api";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Friend from "../listGroupScreen/friend";
import ModalLoading from "../components/modalLoading";
import ObjectGroup from "./objectGroup";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useGroup } from "../../hook/hook";
const ModalAddUserIntoGroup = ({ setmodalvisiable, navigation, friendId }) => {
  const [listItem, setListItem] = useState([]);
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [checkedItems, setCheckedItems] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addMemberToGroup } = useGroup();
  useEffect(() => {
    setListItem(checkedItems);
  }, [checkedItems, setListItem]);

  const getAllGroupFirend = useQuery({
    queryKey: ["getAllGroupFirend", friendId],
    queryFn: () => getAllGroupFirendApi(token, friendId),
  });
  const getListGroup = useQuery({
    queryKey: ["getListGroup"],
    queryFn: async () =>
      getListGroupApi(token)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });
  useEffect(() => {
    const fetchListMember = async () => {
      await getAllGroupFirend.refetch();
      await getListGroup.refetch();
    };
    if (getAllGroupFirend.data && getListGroup.data) {
      const arrFriend = [...getAllGroupFirend.data.data];
      const arr = [...getListGroup.data];
      const arrGroup = arr.filter(
        (item) => !arrFriend.some((i) => i.id === item.id)
      );
      setGroups(arrGroup);
    }
    fetchListMember();
  }, [getAllGroupFirend.data?.data, getListGroup.data]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchListMember = async () => {
        await getAllGroupFirend.refetch();
        await getListGroup.refetch();
      };
      fetchListMember();
    }, [])
  );
  const handleCheckboxPress = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== id)
      );
    }
  };

  const handleAdduserGroup = async () => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn thêm thành viên vào nhóm không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            listItem.map(async (item) => {
              await addMemberToGroup
                .mutateAsync({
                  groupid: item,
                  listmembers: [friendId],
                })
                .catch((err) => {
                  alert("Thêm thành viên vào nhóm không thành công");
                });
            });
            await queryClient.invalidateQueries({
              queryKey: ["getAllGroupFirend", friendId],
            });
            await queryClient.invalidateQueries({ queryKey: ["getListGroup"] });
            Alert.alert("Thông báo", "Thêm thành viên vào nhóm thành công");
            setmodalvisiable(false);
          },
        },
      ]
    );
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
        <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
          Thêm vào nhóm
        </Text>
        {listItem.length > 0 ? (
          <TouchableOpacity onPress={handleAdduserGroup} style={styles.button}>
            <IconIonicons name="add" color="white" size={30} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10 }}>
        Danh sách nhóm
      </Text>
      {getAllGroupFirend.isLoading || getListGroup.isLoading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ marginTop: 5 }}>
          <ScrollView>
            {groups.length === 0 ? (
              <View style={styles.noGroupsContainer}>
                <Text style={styles.noGroupsText}>Không có nhóm nào</Text>
              </View>
            ) : (
              groups.map((item) => (
                <ObjectGroup
                  key={item.id}
                  item={item}
                  isChecked={checkedItems.includes(item.id)}
                  onCheckboxPress={handleCheckboxPress}
                />
              ))
            )}
          </ScrollView>
        </View>
      )}
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
  noGroupsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noGroupsText: {
    fontSize: 18,
    color: "gray",
  },
});
export default ModalAddUserIntoGroup;
