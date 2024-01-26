import { NavigationContainer,CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/homeScreen'
import SignInScreen from './screens/signInScreen'
import HomeScreen from './screens/homeScreen';
import OutSideChat from './router/outSideChat';
import InSideChat from './router/inSideChat';
import FindScreen from './screens/findScreen';



const App = () => {
  return (
    <NavigationContainer>
      {/* <OutSideChat/> */}
    <OutSideChat/>
    </NavigationContainer>
    
  );
};

export default App;