import { ScrollView, View, Text, Alert } from "react-native";
import ObjectChat from "../listChatScreen/objectChat";
import ObjectSend from "./objectSend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getListContactApi, sendRecallFriendApi } from "../../apis/user.api";

const SendInvite = ({ navigation }) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [contacts, setContacts] = useState([]);
  const getListContact = useQuery({
    queryKey: ["getListContact", "sent"],
    queryFn: () =>
      getListContactApi(token, "sent").then((res) => {
        return res.data;
      }),
  });
  useEffect(() => {
    if (getListContact.data) {
      setContacts(getListContact.data);
    }
  }, [getListContact.data, token]);
  if (getListContact.isLoading) return <Text>Loading...</Text>;
  const handleCancel = async (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn hủy lời mời này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          await sendRecallFriendApi(token, id)
            .then(async (res) => {
              await queryClient.invalidateQueries({
                queryKey: ["getListContact", "sent"],
              });
              Alert.alert("Thông báo", res.data);
              setContacts((prevContacts) =>
                prevContacts.filter((item) => item.profile.id !== id)
              );
            })
            .catch((err) => alert(err["response"]));
        },
      },
    ]);
  };
  return (
    <ScrollView style={{ marginTop: 10 }}>
      {contacts.length > 0 ? (
        contacts.map((element) => (
          <ObjectSend
            key={element.profile.id}
            data={element}
            handleCancel={handleCancel}
          />
        ))
      ) : (
        <Text>Không có gửi lời mời kết bạn nào</Text>
      )}
    </ScrollView>
  );
};
export default SendInvite;
