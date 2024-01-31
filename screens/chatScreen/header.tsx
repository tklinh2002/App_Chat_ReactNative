import { View, Text } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import IconFoundation from "react-native-vector-icons/Foundation"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"


const HearderChat = () => {
    const navigation = useNavigation()
    const backNavigation = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.rowContainer}>
            <Icon name="left" color="#ffffff" size={30} onPress={backNavigation} />
            <Text style={styles.headerText}>Linh</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <IconSimpleLineIcons style={styles.icon} name="phone" color="#ffffff" size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon style={styles.icon} name="videocamera" color="#ffffff" size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <IconFoundation style={styles.icon} name="list-bullet" color="#ffffff" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default HearderChat