import { View, StyleSheet, TextInput } from "react-native"

import { white } from "../../assets/colors"
import { useState } from "react";

const InputChat = ()=>{
    const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const inputStyle = isFocused ? styles.focusedInput : styles.defaultInput;
    return(
            <View style={[styles.chat,inputStyle]}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Tin nhắn"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
    )
}
const styles = StyleSheet.create({
    chat:{
        paddingBottom:30,
        backgroundColor:white,
        
    },
    input:{
        backgroundColor:white,
        borderWidth:0,
        height:50,
        fontSize:18,
        marginLeft:"5%",
        
    },
    defaultInput: {
        paddingBottom:30
    },
    focusedInput: {
        paddingBottom:0
      },
})
export default InputChat