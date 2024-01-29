import { View, Text,StyleSheet, ScrollView } from "react-native"
import Header from "../components/headerFind"
import  Icon  from "react-native-vector-icons/Ionicons"
import { white, backgroundHeader } from "../../assets/colors"
import ObjectChat from "./objectChat"

const ListChatScreen =  ()=>{   
    return(
        <View>

            {/* header */}
            <View style={styles.header}>
                <Header/>
                <Icon name='add' size={30} color={white} style={{marginEnd:"2%"}}/>
            </View>
            {/* body */}
            <ScrollView>
                <ObjectChat/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:backgroundHeader,
        flexDirection:"row",
        paddingTop:"12%",
        justifyContent: "space-between",
    }
})
export default ListChatScreen