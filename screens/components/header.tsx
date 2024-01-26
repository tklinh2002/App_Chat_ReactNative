import React from "react";
import { TouchableOpacity, View , Text} from "react-native";
import Icon  from "react-native-vector-icons/Entypo";
import { useNavigation} from '@react-navigation/native';
const Header = ()=>{
    const navigation = useNavigation()
    return (
            <View>
                <TouchableOpacity 
                style={{
                    flexDirection:"row",
                    justifyContent:"flex-start",
                    marginStart:"5%"
                }}
                onPress={()=>navigation.navigate('Find' as never)}
                >
                    <Icon name="magnifying-glass" color="#ffffff" size={30}/>
                    <Text style={{fontSize:15, marginLeft:"10%", marginTop:"2%", color:"#ffffff"}}>Tìm kiếm</Text>
                </TouchableOpacity>

            </View>
    )
}
export default Header;