import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { backgroundHeader, white } from "../../assets/colors";
import { CheckBox } from "@rneui/themed";
import { Avatar } from "react-native-elements";

const ObjectGroup = ({ item, isChecked, onCheckboxPress }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.object}
        onPress={() => onCheckboxPress(item.id, !isChecked)}
      >
        <CheckBox
          checked={isChecked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <Avatar
          rounded={true}
          size={"medium"}
          title={item?.name[0]}
          activeOpacity={0.7}
          source={{ uri: item?.thumbnailAvatar }}
        />
        <Text style={{ fontSize: 18, flex: 1 }}>{item?.name}</Text>
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

export default ObjectGroup;
