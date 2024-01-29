import { NavigationContainer,CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signInScreen/index'
import HomeScreen from '../screens/homeScreen/index';
import InSideChat from './inSideChat';
import FindScreen from '../screens/findScreen/index';
import ChatScreen from '../screens/chatScreen/index';


const Stack = createNativeStackNavigator();

const OutSideChat = ()=>{
    return(
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#00FF00' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false, title:""}}/>
        {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        <Stack.Screen name="SignIn" component={SignInScreen} options={{title:"Đăng nhập"}}/>
        <Stack.Screen name="Find" component={FindScreen} options={{headerShown:false, title:""}}/>
        {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        <Stack.Screen name="Chat" component={ChatScreen} options={{title:"", headerShown:false}}/>
        <Stack.Screen name="InsideChat" component={InSideChat} options={{headerShown:false }}/>
      </Stack.Navigator>
    )
}
export default OutSideChat
