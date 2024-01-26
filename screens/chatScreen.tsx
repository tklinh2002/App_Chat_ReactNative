
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native"
import { white, backgroundHeader, backgroundChat } from "../assets/colors"
import Icon  from "react-native-vector-icons/AntDesign"
import IconFoundation  from "react-native-vector-icons/Foundation"
import SendChat from "./components/sendchat"
import ReceiveChat from "./components/receivechat"
import InputChat from "./components/inputChat"

const ChatScreen = ()=>{ 
    return(
        <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={2} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.header}>
                <View style={styles.rowContainer}>
                    <Icon name="left" color="#ffffff" size={30}/>
                    <Text style={styles.headerText}>Linh</Text>
                    <View style={styles.iconContainer}>
                        <Icon style={styles.icon}  name="phone" color="#ffffff" size={30} />
                        <Icon style={styles.icon} name="videocamera" color="#ffffff" size={30} />
                        <IconFoundation style={styles.icon}  name="list-bullet" color="#ffffff" size={30}/>
                    </View>
                </View>
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
const styles = StyleSheet.create({
    reverseContent: {
        flexDirection: 'column-reverse', // Reverse the order of elements
      },
    bodyChat:{
        backgroundColor:backgroundChat,
        transform: [{ scaleY: -1 }]

    },
    header:{
        backgroundColor:backgroundHeader,
        flexDirection:"row",
        paddingTop:"12%",
        justifyContent: "flex-start",
    },
    rowContainer: {
      flexDirection: "row",
      marginStart: "2%",
      alignItems: "center", 
    },
    headerText: {
      fontSize: 18,
      marginLeft: "5%",
      marginTop: "2%",
      color: "#ffffff",
      fontWeight: "bold",
    },
    iconContainer: {
      flexDirection: "row",
      justifyContent:"flex-end",
      width:"78%",
    },
    icon:{
        marginLeft:"8%"
    }
})

export default ChatScreen