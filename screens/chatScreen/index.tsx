
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native"
import { white, backgroundHeader, backgroundChat } from "../../assets/colors"
import Icon  from "react-native-vector-icons/AntDesign"
import IconFoundation  from "react-native-vector-icons/Foundation"
import SendChat from "./sendchat"
import ReceiveChat from "./receivechat"
import InputChat from "./inputChat"
import styles from "./styles"
import HearderChat from "./header"

const ChatScreen = ()=>{ 
    return(
        <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={2} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.header}>
                <HearderChat/>
            </View>

            <ScrollView style={styles.bodyChat}>
                <ReceiveChat/>    
                <SendChat/>
            </ScrollView>

            <View>
                <InputChat/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen