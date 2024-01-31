import { View, Text,StyleSheet, ScrollView } from "react-native"
import Header from "../components/headerFind"
import  Icon  from "react-native-vector-icons/Ionicons"
import { white, backgroundHeader } from "../../assets/colors"
import ObjectChat from "./objectChat"

const ListChatScreen =  ()=>{   
    return(
        <View>
            {/* body */}
            <ScrollView>
                <ObjectChat/>
            </ScrollView>
        </View>
    )
}


export default ListChatScreen