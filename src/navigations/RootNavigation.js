import React from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, MobileScreen, VerifyOTP, Dashboard, EditProfile, UserDetails,GeoFencingList, MyLocation } from '../screens';


const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'transparent'} translucent barStyle={'dark-content'} />
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{headerShown:false}} name="MobileScreen" component={MobileScreen} />
        <Stack.Screen options={{headerShown:false}} name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard} />
        <Stack.Screen options={{headerShown:false}} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={{headerShown:false}} name="UserDetails" component={UserDetails} />
        <Stack.Screen options={{headerShown:false}} name="GeoFencingList" component={GeoFencingList} />
        <Stack.Screen options={{headerShown:false}} name="MyLocation" component={MyLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation