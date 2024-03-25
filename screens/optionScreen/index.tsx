import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import Header from "../components/headerFind"
import Icon from "react-native-vector-icons/Ionicons"
import { white, backgroundHeader } from "../../assets/colors"
import styles from "./styles"
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import IconAntDesign from "react-native-vector-icons/AntDesign"
const handName =()=>{

}
const handFile=()=>{
        
}
const handAddGroup=()=>{
    
}
const handAddUser=()=>{
    
}
const handTrash=()=>{
    
}
const OptionScreen = ({ name }) => {
    
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerHeader}>
                <Image style={styles.img} source={require('D:/Code/cnm/vietchat/assets/images/images.jpg')}/>
                <Text style={{ fontSize: 20 }}>{name + ""}</Text>
                <View style={styles.containerIcon}>
                    <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
                        <View style={styles.icon}>
                            <IconSimpleLineIcons name="magnifier" color="black" size={20} />
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 12 }}>Tìm tin nhắn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
                        <View style={styles.icon}>
                            <IconAntDesign name="user" color="black" size={20} />
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 12 }}>Trang cá nhân</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerList}>
                <TouchableOpacity style={styles.objectList} onPress={handName}>
                    <IconSimpleLineIcons name="pencil" color="black" size={25} />
                    <Text style={styles.text}>Đổi tên gợi nhớ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.objectList} onPress={handFile}>
                    <IconSimpleLineIcons name="picture" color="black" size={25} />
                    <Text style={styles.text}>Ảnh, file, link đã gửi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.objectList} onPress={handAddGroup}>
                    <IconAntDesign name="addusergroup" color="black" size={25} />
                    <Text style={styles.text}>{"Tạo nhóm với " + name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.objectList} onPress={handAddUser}>
                    <IconAntDesign name="adduser" color="black" size={25} />
                    <Text style={styles.text}>{"Thêm " + name + " vào nhóm"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.objectList} onPress={handTrash}>
                    <IconSimpleLineIcons name="trash" color="black" size={25} />
                    <Text style={styles.text}>{"Xóa lịch sử trò chuyện"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OptionScreen