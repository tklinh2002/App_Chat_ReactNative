import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/headerFind";
import Icon from "react-native-vector-icons/Ionicons";
import { white, backgroundHeader } from "../../assets/colors";
import ObjectChat from "./objectChat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListChatRoomApi } from "../../apis/chat.api";
import { useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getProfileAPI } from "../../apis/auth.api";

const ListChatScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const getListChatRoom = useQuery({
    queryKey: ["getListChatRoom"],
    queryFn: async () =>
      getListChatRoomApi(token).then((res) => {
        return res.data;
      }).catch((err) => {
        console.log(err);
        }),
  });
  const getProfile = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () =>
      await getProfileAPI(token).then((res) => {
        queryClient.setQueryData(["profile"], res.data);
        return res.data;
      }).catch((err) => console.log(err)),
  });
  // useEffect(() => {
  //   getListChatRoom.refetch(); // Refetch chat room list when component mounts
  // }, []);

  if(getListChatRoom.isLoading|| getProfile.isLoading) return <Text>Loading...</Text>;
  // console.log(getListChatRoom.data);
  return (
    <View>
      {/* body */}
      <ScrollView>
        {getListChatRoom.data?.map((chatRoom) => {
          return (
            <ObjectChat
              key={chatRoom.id}
              chatRoom={chatRoom}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListChatScreen;
