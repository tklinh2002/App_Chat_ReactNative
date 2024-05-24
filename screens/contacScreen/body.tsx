import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
} from "react-native";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import Friend from "./friend";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFriend } from "../../hook/hook";

const BodyContact = () => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const { removeFriend } = useFriend();

  useFocusEffect(
    React.useCallback(() => {
      const fetchContacts = async () => {
        const contactsQuery = (await queryClient.getQueryData([
          "getListContact",
          "friend",
        ])) as any;
        if (contactsQuery) {
          setContacts(contactsQuery);
        }
      };

      fetchContacts();

      return () => {
        // Cleanup (nếu cần)
      };
    }, [queryClient, token])
  );
  const sortedContacts = contacts
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

  const handPressInvite = () => {
    navigation.navigate("TabInvite" as never);
  };
  const handleRemoveFriend = async (id) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa bạn này?", [
      {
        text: "Hủy",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          await removeFriend
            .mutateAsync(id)
            .then((res) => {
              setContacts(
                contacts.filter((contact) => contact?.profile?.id !== id)
              );
              alert(res.data);
            })
            .catch((err) => {
              alert(err?.response?.data?.detail);
            });
        },
      },
    ]);
  };
  return (
    <View style={{ marginTop: 5 }}>
      <TouchableOpacity style={styles.header} onPress={handPressInvite}>
        <View style={styles.icon}>
          <IconFontAwesome5 name="user-friends" color="#ffffff" size={25} />
        </View>
        <Text style={{ fontSize: 18 }}>Lời mời kết bạn</Text>
      </TouchableOpacity>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.profile.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Friend
            item={item}
            navigation={navigation}
            handleRemoveFriend={handleRemoveFriend}
          />
        )}
      />
    </View>
  );
};

export default BodyContact;
