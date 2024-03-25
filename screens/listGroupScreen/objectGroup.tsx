import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Image, TouchableOpacity, StyleSheet, Text } from "react-native"
import { View } from "react-native"

const ObjectGroup = () => {
    const navigation = useNavigation()
    const handPress = () => {
        navigation.navigate('Chat' as never)
    }

    return (
        <View>
            <TouchableOpacity style={styles.object} onPress={handPress}>
                <Image style={styles.img} source={require('D:/Code/cnm/vietchat/assets/images/images.jpg')} />
                <View style={{ width: "65%" }}>
                    {/* thay đổi tên  */}
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Tên nhóm</Text>
                    <Text >tin nhắn cuối</Text>
                </View>
                <Text>8 giờ</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    object: {
        height: 80,
        justifyContent: "space-between",
        borderBottomWidth: 0.2,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:"white"
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginHorizontal: "2%"
    }
})
export default ObjectGroup