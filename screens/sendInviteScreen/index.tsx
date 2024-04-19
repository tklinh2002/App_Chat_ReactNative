import { ScrollView, View, Text } from "react-native";
import ObjectChat from "../listChatScreen/objectChat";
import ObjectSend from "./objectSend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getListContactApi } from "../../apis/user.api";

const SendInvite = ({navigation}) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [contacts, setContacts] = useState([]);

  const getListContact = useQuery({
    queryKey: ["getListContact", "sent"],
    queryFn: () =>
      getListContactApi(token, "sent")
        .then((res) => {
          setContacts([...res.data]);
          return res.data;
        })
        .catch((err) => console.log(err["response"])),
  });

  if (getListContact.isLoading) return <Text>Loading...</Text>;
  const handleCancel = async (id) => {
    console.log("id thu hồi", id);
  }
  return (
    <ScrollView style={{ marginTop: 10 }}>
      {contacts.map((element) => (
        <ObjectSend key={element.profile.id} data={element} handleCancel={handleCancel}/>
      ))}
    </ScrollView>
  );
};
export default SendInvite;
