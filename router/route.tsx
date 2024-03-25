import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signInScreen/index'
import HomeScreen from '../screens/homeScreen/index';
import TabChat from './tabChat';
import FindScreen from '../screens/findScreen/index';
import ChatScreen from '../screens/chatScreen/index';
import TabInvite from './tabInvite';
import { backgroundHeader } from '../assets/colors';
import Hearder from '../screens/components/header';
import { Title } from 'react-native-paper';
import OptionScreen from '../screens/optionScreen';



const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: backgroundHeader },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "" }} />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Đăng nhập" }} />
      <Stack.Screen name="Find" component={FindScreen} options={{ headerShown: false, title: "" }} />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "", headerShown: false }} />
      <Stack.Screen name="TabChat" component={TabChat} options={{ headerShown: false }} />
      <Stack.Screen name="TabInvite" component={TabInvite} options={{
        header: () => <Hearder
          title={"Lời mời kết bạn"} />
      }} />
      <Stack.Screen name="Option" component={OptionScreen} options={{
        header: () => <Hearder
          title={"Tùy chọn"} />
      }} />
    </Stack.Navigator> 
  )
}
export default Route
