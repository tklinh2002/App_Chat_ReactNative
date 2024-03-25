import { backgroundChat, backgroundHeader, white } from "../../assets/colors";
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerHeader:{
        backgroundColor:white,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10
    },
    img:{
        height:70,
        width:70,
        borderRadius:40,
        marginBottom:10
    },
    containerIcon:{
        flexDirection:"row",
        backgroundColor:"white",
        justifyContent:"space-between",
        width:"40%",
        marginTop:20
    },
    icon:{
        backgroundColor:"#E3E3E3",
        borderRadius:40,
        height:30,
        width:30,
        alignItems:"center",
        justifyContent:"center"
    },
    containerList:{
        marginTop:10
    },
    objectList:{
        backgroundColor:white,
        flexDirection:"row",
        paddingLeft:5,
        borderBottomColor:"black",
        borderBottomWidth:0.2,
        height:60,
        alignItems:"center"
    },
    text:{
        fontSize:16,
        marginLeft:8
    }
})

export default styles