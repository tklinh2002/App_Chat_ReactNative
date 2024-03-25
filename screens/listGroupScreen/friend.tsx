import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { backgroundHeader, white } from "../../assets/colors";
import { CheckBox } from "@rneui/themed";

const Friend = ({ id, name, image, isChecked, onCheckboxPress }) => {
  const navigation = useNavigation();

  const handPress = () => {
    navigation.navigate("Chat" as never);
  };

  return (
    <View>
      <TouchableOpacity style={styles.object} onPress={() => onCheckboxPress(id, !isChecked)}>
        <CheckBox
          checked={isChecked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <Image
          style={styles.img}
          source={require("D:/Code/cnm/vietchat/assets/images/images.jpg")}
        />
        <Text style={{ fontSize: 18, flex: 1 }}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Friend;
