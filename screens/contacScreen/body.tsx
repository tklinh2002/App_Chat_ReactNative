import { View, Text, StyleSheet, SectionList, TouchableOpacity } from "react-native"
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5"
import styles from "./styles"
import Friend from "./friend"
import { useNavigation } from "@react-navigation/native"
import React from 'react'



const contacts = [
    { id: 1, name: 'Alice', img: 'D:/Code/cnm/vietchat/assets/images/images.jpg' },
    { id: 2, name: 'Bob', img: 'D:/Code/cnm/vietchat/assets/images/images.jpg' },
    { id: 3, name: 'Charlie', c: 'D:/Code/cnm/vietchat/assets/images/images.jpg' },
    { id: 4, name: 'Charlie', img: 'D:/Code/cnm/vietchat/assets/images/images.jpg' },
    // Add more contacts as needed
];

// Sort contacts alphabetically by name
const sortedContacts = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));

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


const BodyContact = () => {
    const navigation = useNavigation()
    const handPressInvite = () => {
        navigation.navigate('TabInvite' as never)
    }
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
                    />
                )}
            />
        </View>

    )
}

export default BodyContact