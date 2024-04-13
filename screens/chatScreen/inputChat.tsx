import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { backgroundHeader, white } from "../../assets/colors";
import React, { useState } from "react";
import styles from "./styles";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";
const InputChat = ({ onSendMessage }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handSendText = async () => {
    // console.log(media);
      onSendMessage(text, media);
      setMedia([]);
      setText("");
    
  };
  const [text, setText] = useState("");
  const inputStyle = isFocused ? styles.focusedInput : styles.defaultInput;
  const isInputEmpty = text === "" ? true : false;
  const iconStyle = isInputEmpty
    ? styles.inputEmptyText
    : styles.inputIncludeText;
  // pick media
  const [media, setMedia] = useState([]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      base64: true
    });

    if (!result.canceled) {
      const newImages = result.assets.filter((item) => {
        return !media.some((mediaItem) => mediaItem.fileName === item.fileName);
      });
      setMedia([...media, ...newImages]);
    }
  };

  // pickdocument
  const pickDocument = () => {
    console.log(atob(media[0].base64));

  };
  const handleDeteleMedia = (fileName) => () => {
    const newMedia = media.filter((item) => item.fileName !== fileName);
    setMedia(newMedia);
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {media.map((item) => (
          <View key={item.uri}>
            {item.type === "image" ? (
              <TouchableOpacity onPress={handleDeteleMedia(item.fileName)}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 70, height: 70, margin: 5 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleDeteleMedia(item.fileName)}>
                <Video
                  source={{ uri: item.uri }}
                  style={{ width: 70, height: 70 }}
                  useNativeControls={true}
                  resizeMode={ResizeMode.CONTAIN}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      {/* <Image source={require("../../assets/images/images.jpg")} /> */}

      <View style={[styles.chat, inputStyle]}>
        <TextInput
          style={styles.input}
          placeholder="Tin nhắn"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => {
            setText(text);
          }}
          value={text}
          multiline={true} // Enable multiline
          numberOfLines={2}
          scrollEnabled={true} // Enable scrolling
        />
        <View style={[styles.inputIcon, iconStyle]}>
          {text === "" ? (
            <>
              {media.length > 0 && (
                <TouchableOpacity onPress={handSendText}>
                  <IconFeather name="send" color={backgroundHeader} size={25} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={pickDocument}>
                <IconIonicons name="camera" color="black" size={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage} style={{marginRight:10}}>
                <IconSimpleLineIcons name="picture" color="black" size={25} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handSendText} >
                <IconFeather name="send" color={backgroundHeader} size={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage} style={{marginRight:10}}>
                <IconSimpleLineIcons name="picture" color="black" size={25} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default InputChat;
