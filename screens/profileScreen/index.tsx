import { View, Text,StyleSheet } from "react-native"
import Header from "../components/headerFind"
import  Icon  from "react-native-vector-icons/Ionicons"
import { white, backgroundHeader } from "../../assets/colors"
const ProfileScreen = () => {
    return(
        <View>
            <View style={styles.header}>
                <Header/>
                <Icon name='add' size={30} color={white} style={{marginEnd:"2%"}}/>
            </View>
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
export default ProfileScreen