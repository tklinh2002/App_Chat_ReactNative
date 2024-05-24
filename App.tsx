import { NavigationContainer, CommonActions } from "@react-navigation/native";
import Route from "./router/route";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Input } from "@rneui/themed/dist/Input";
import InputChat from "./screens/chatScreen/inputChat";
import { TouchableOpacity, View, Text } from "react-native";
import { connectSocket } from "./utils/socket";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OptionChatGroup from "./screens/optionScreen/optionChatGroup";
import IconEntypo from "react-native-vector-icons/Entypo";
import { Button } from "react-native-paper";
import * as Notifications from "expo-notifications";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </QueryClientProvider>
    // <View style={{ flex: 1, justifyContent: "center" }}>
    //   <Button icon="camera" mode="contained" onPress={handlepress}>
    //     Press me
    //   </Button>
    // </View>
    // <OptionChatGroup navigation={navigator}/>
  );
};
export default App;
