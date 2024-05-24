import { ActivityIndicator, Modal, View } from "react-native";

const ModalLoading = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};
export default ModalLoading;
