import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactScreen from '../screens/contacScreen/index';
import ProfileScreen from '../screens/profileScreen/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListChatScreen from '../screens/listChatScreen/index';


const Tab = createBottomTabNavigator();
const FindStack = createNativeStackNavigator();

const InSideChat = ()=>{
    return(
        <Tab.Navigator
      initialRouteName="ListChat"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="ListChat"
        component={ListChatScreen}
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown:false
        }}
      />
    </Tab.Navigator>
    
    )
}

export default InSideChat