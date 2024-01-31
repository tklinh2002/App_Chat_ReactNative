import { StyleSheet, TouchableOpacity, View, Image, Text, TouchableWithoutFeedback } from "react-native"



const ObjectReceive = ({ data }) => {
    return (
        <TouchableWithoutFeedback >
            <View style={styles.object}>
                <Image style={styles.img} source={require('D:/Code/cnm/vietchat/assets/images/images.jpg')} />
                <View style={styles.boxText}>
                    {/* thay đổi tên  */}
                    <Text style={styles.text}>{data.name}</Text>
                    <Text style={{ color: "gray" }}>{data.date + "| Muốn kết bạn"}</Text>
                    <Text style={[styles.text, styles.box]}>{data.title + "aaaaaaaaaaaaa"}</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#E0E0E0" }]}>
                            <Text style={styles.text}>Từ chối</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#E9F6FF" }]}>
                            <Text style={[styles.text, { color: "#1187F1" }]}>Đồng ý</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    object: {
        justifyContent: "flex-start",
        borderBottomWidth: 0.2,
        flexDirection: "row",
        paddingBottom: 8

    },
    img: {
        width: 45,
        height: 45,
        borderRadius: 40,
        marginHorizontal: "2%"
    },
    boxText: {
        flex: 1,
        marginRight: 20,

    },
    text: {
        fontSize: 18
    },
    box: {
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 5,
        borderRadius: 10,
        marginTop: 10,
        height: 45,
        textAlignVertical: "center"
    },
    button: {
        width: "40%",
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 20
    }
})
export default ObjectReceive