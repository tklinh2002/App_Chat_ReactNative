import { View, StyleSheet, TextInput, ScrollView } from "react-native"

import { backgroundHeader, white } from "../../assets/colors"
import React, { useState } from "react";
import styles from "./styles"
import IconFeather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
const InputChat = () => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const [text, setText] = useState('')
  const handText = (input) => {
    setText(input);
  };
  const inputStyle = isFocused ? styles.focusedInput : styles.defaultInput;
  const isInputEmpty = text === '' ? true : false
  const iconStyle = isInputEmpty ? styles.inputEmptyText : styles.inputIncludeText

  return (
    <View style={[styles.chat, inputStyle]}>
      <TextInput
        style={styles.input}
        placeholder="Tin nhắn"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handText}
        value={text}
        multiline={true} // Enable multiline
        numberOfLines={2} 
        scrollEnabled={true} // Enable scrolling
      />
      <View style={[styles.inputIcon, iconStyle]}>
        {text === '' ? (
          <>
            <IconSimpleLineIcons name="paper-clip" color="black" size={30} />
            <IconSimpleLineIcons name="microphone" color="black" size={30} />
            <IconSimpleLineIcons name="picture" color="black" size={30} />
          </>
        ) : (
          <IconFeather name="send" color={backgroundHeader} size={30} />
        )}
      </View>
    </View>
  )
}
export default InputChat