import {View, Text, Image, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import {Logo} from '../images';
import Theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useState(() =>{
    const isUserLogin=async()=>{
      const response = JSON.parse(await AsyncStorage.getItem('user'));
      if(response!=null)
      {
        if(response.fullName=='' && response.email=='')
        {
          navigation.navigate('EditProfile');
        }
        else
        {
          navigation.navigate('UserDetails');
        }
      }
    }
    isUserLogin();
  },[])

  return (
    <View style={Theme.container}>
      <Image source={Logo} style={Theme.logo} />
      <View style={[Theme.splashCard, Theme.shadow]}>
        <Text style={Theme.helloText}>Hello</Text>
        <Text style={Theme.splashTitle}>Welcome</Text>
        <Text style={Theme.splashSubTitle}>
          Fulfill your commodity requirements easily at one place.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MobileScreen');
          }}
          style={[Theme.splashButton, Theme.shadow]}>
          <Text style={Theme.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
