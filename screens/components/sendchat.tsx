import { View, StyleSheet, Text } from "react-native"
import { sendChat, white } from "../../assets/colors"

const SendChat = () =>{
    return(
        <View style={styles.chat}>
            <View style={styles.container}>
                <Text style={{fontSize:17, marginHorizontal:"3%"}}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container:{
        width:"70%",
        backgroundColor:sendChat,
        borderRadius:10
    }, 
    chat:{
        flexDirection:"row",
        marginVertical:6,
        alignSelf:"flex-end",
        marginRight:"2%",
        transform: [{ scaleY: -1 }]
    },
})
export default SendChat