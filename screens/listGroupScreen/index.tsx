import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import ObjectGroup from "./objectGroup";
import { white } from "../../assets/colors";
import { useState } from "react";
import ChildrenModal from "./childrenModal";

const ListGroupScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    setModalVisible(true);
  };
  return (
    <ScrollView>
      <TouchableOpacity style={styles.object} onPress={handleModal}>
        <View style={styles.icon}>
          <Icon name="addusergroup" color="#0382F7" size={30} />
        </View>
        <Text style={{ color: "#0382F7", fontSize: 18 }}>Tạo nhóm mới</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: white, marginTop: 5 }}>
        <Text style={{ fontSize: 15, marginLeft: 5 }}>
          Nhóm đang tham gia ({5})
        </Text>
      </View>
      <View style={styles.containerListGroup}>
        <ObjectGroup />
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ChildrenModal setmodalvisiable={setModalVisible}/>
      </Modal>
    </ScrollView>
  );
};

export default ListGroupScreen;
