import { NavigationContainer, CommonActions } from "@react-navigation/native";
import Route from "./router/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Input } from "@rneui/themed/dist/Input";
import InputChat from "./screens/chatScreen/inputChat";
import { View } from "react-native";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
      },
    },
  });
  const abc = (text: string) => {
    console.log(text);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </QueryClientProvider>
    // <View style={{flex:1,justifyContent:"center", backgroundColor:"gray"}}>
    //   <InputChat onSendMessage={abc}/>
    // </View>
  );
};
export default App;
