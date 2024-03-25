import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { backgroundHeader, white } from "../../assets/colors";
import Friend from "./friend";

const contacts = [
  {
    id: 1,
    name: "Alice",
    img: "D:/Code/cnm/vietchat/assets/images/images.jpg",
  },
  { id: 2, name: "Bob", img: "D:/Code/cnm/vietchat/assets/images/images.jpg" },
  {
    id: 3,
    name: "Charlie",
    img: "D:/Code/cnm/vietchat/assets/images/images.jpg",
  },
  {
    id: 4,
    name: "Charlie",
    img: "D:/Code/cnm/vietchat/assets/images/images.jpg",
  },
  // Add more contacts as needed
];

// Sort contacts alphabetically by name
const sortedContacts = contacts
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

// Group contacts into sections based on the initial letter of their names
const groupedContacts = sortedContacts.reduce((acc, contact) => {
  const initial = contact.name[0].toUpperCase();
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


const BodyModal = ({setListItem}) => {
  const navigation = useNavigation();
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setListItem(checkedItems);
  }, [checkedItems, setListItem]);

  const handleCheckboxPress = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== id)
      );
    }
  };
  return (
    <View style={{ marginTop: 5 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Friend
            id={item.id}
            name={item.name}
            image={item.img}
            isChecked={checkedItems.includes(item.id)}
            onCheckboxPress={handleCheckboxPress}
          />
        )}
      />
      
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
    marginBottom: 10,
  },
  icon: {
    borderRadius: 8,
    backgroundColor: backgroundHeader,
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3%",
  },
  listFriend: {},
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: white,
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  object: {
    height: 60,
    justifyContent: "flex-start",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
});
export default BodyModal;
