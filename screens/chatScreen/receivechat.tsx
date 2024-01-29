import { View,Text, StyleSheet,Image } from "react-native"
import { white } from "../../assets/colors"

const ReceiveChat = () =>{
    return(
        <View style={styles.chat}>
            <Image style={styles.img} source={require('D:/Code/cnm/vietchat/assets/images/images.jpg')} /> 
            <View style={styles.container}>
                <Text style={{fontSize:17, marginHorizontal:"3%"}}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:"70%",
        backgroundColor:white,
        borderRadius:10
    },
    img:{
        width:30,
        height:30,
        borderRadius:40,
        marginHorizontal:"2%"
    },
    chat:{
        flexDirection:"row",
        marginVertical:6,
        transform: [{ scaleY: -1 }]
    },
})
export default ReceiveChat