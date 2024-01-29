import { View, Text } from "react-native"
import { useNavigation } from '@react-navigation/native';
const FindScreen = ()=>{
    const navigation = useNavigation()
    return(
        <View>
            <Text>FindScreen</Text>
        </View>
    )
}

export default FindScreen