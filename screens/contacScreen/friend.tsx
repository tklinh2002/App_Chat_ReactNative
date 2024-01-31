import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
const Friend = ({ id, name, image }) => {
  const navigation = useNavigation();

  const handPress = () => {
    navigation.navigate('Chat' as never);
  };
  return (
    <View>
      <TouchableOpacity style={styles.object} onPress={handPress}>
        <Image style={styles.img} source={require('D:/Code/cnm/vietchat/assets/images/images.jpg')} />
        <Text style={{ fontSize: 18, flex: 1 }}>{name}</Text>
        <TouchableOpacity>
          <IconSimpleLineIcons name="phone" color="black" size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon style={{ marginHorizontal: 20 }} name="videocamera" color="black" size={25} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default Friend;
