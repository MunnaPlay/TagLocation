import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React,{useState, useEffect} from 'react';
import {Header} from '../components';
import Theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetails = ({navigation}) => {
  const [user, setUser] = useState({});
  useEffect(() =>{
    const isUserLogin=async()=>{
      const response = JSON.parse(await AsyncStorage.getItem('user'));
      setUser(response);
    }
    isUserLogin();
  },[])
  return (
    <View style={[Theme.mainContainer,{backgroundColor:'#F6F6F6'}]}>
      <Header title={'User Detail'} navigation={navigation} isBack={false} />
      <View style={{padding:20,flex:1}}>
        <View>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Full Name</Text>
          <TextInput style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10,color:'#000'}} editable={false} value={user.fullName} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Phone Number</Text>
          <TextInput style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10,color:'#000'}} editable={false} value={user.mobile} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Address</Text>
          <TextInput style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10,color:'#000'}} editable={false} value={`${user.address}, ${user.city}, ${user.state}, ${user.pin}`} placeholder={'87786778665'} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={[Theme.SignInButton, Theme.shadow]}>
          <Text style={Theme.getStartedText}>Add Geofening</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GeoFencingList')} style={[Theme.SignInButton, Theme.shadow]}>
          <Text style={Theme.getStartedText}>Show Geofening</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserDetails