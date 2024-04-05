import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/signInScreen/index";
import HomeScreen from "../screens/homeScreen/index";
import TabChat from "./tabChat";
import ChatScreen from "../screens/chatScreen/index";
import TabInvite from "./tabInvite";
import { backgroundHeader } from "../assets/colors";
import Hearder from "../screens/components/header";
import { Title } from "react-native-paper";
import OptionScreen from "../screens/optionScreen";
import RegisterForm from "../screens/singUpScreen/RegisterForm";
import Authentication from "../screens/singUpScreen/Authentication";
import FindScreen from "../screens/findScreen/FindScreen";
import Register from "../screens/singUpScreen/Register";
import ForgetPassword from "../screens/forgetPasswordScreen/forgetPassword";
import ConfirmOTP from "../screens/forgetPasswordScreen/confirmOTP";
import ResetPassword from "../screens/forgetPasswordScreen/ResetPassword";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: backgroundHeader },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: "" }}
      />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: ""}}
      />
      <Stack.Screen
        name="Find"
        component={FindScreen}
        options={{ headerShown: false, title: "" }}
      />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="TabChat"
        component={TabChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabInvite"
        component={TabInvite}
        options={{
          header: () => <Hearder title={"Lời mời kết bạn"} />,
        }}
      />
      <Stack.Screen
        name="Option"
        component={OptionScreen}
        options={{
          header: () => <Hearder title={"Tùy chọn"} />,
        }}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterForm}
        options={{ title: ""}}
      />
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={{ title: "Xác thực OTP"}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: ""}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ title: "Quên mật khẩu"}}
      />
      <Stack.Screen
        name="ConfirmOTP"
        component={ConfirmOTP}
        options={{ title: ""}}

      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: ""}}

      />
    </Stack.Navigator>
  );
};
export default Route;
