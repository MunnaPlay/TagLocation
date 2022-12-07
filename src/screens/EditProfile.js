import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState, useEffect} from 'react';
import {Header} from '../components';
import {updateProfileAPI,getUserAPI} from '../api';
import Theme from '../theme';

const {height, width} = Dimensions.get('screen');
const EditProfile = ({navigation}) => {
  const [userDetail, setUserDetail] = useState({});
  const [loader, setLoader] = useState(false);

  useState(() =>{
    const isUserLogin=async()=>{
      const response = JSON.parse(await AsyncStorage.getItem('user'));
      setUserDetail({...userDetail,mobile:response.mobile});
    }
    isUserLogin();
  },[]);

  const saveUserDetail=async()=>{
    setLoader(true)
    const response = await updateProfileAPI(userDetail);
    if(response.Status==true)
    {
      const userRes = await getUserAPI(userDetail.mobile);
      await AsyncStorage.setItem('user', JSON.stringify(userRes.User[0]));
      navigation.navigate('UserDetails');
    }
  }

  return (
    <View style={[Theme.mainContainer,{backgroundColor:'#F6F6F6'}]}>
      <Header title={'Edit Profile'} navigation={navigation} isBack={false} />
      <ScrollView style={{padding:20}}>
        <View>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Your Name</Text>
          <TextInput onChangeText={(text) => setUserDetail({...userDetail,fullName:text})} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'John Doe'} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Phone Number</Text>
          <TextInput style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10,color:'#000'}} editable={false} selectTextOnFocus={false} value={userDetail.mobile} placeholder={'(0) 053 555 555'} />
          <Text style={{position:'absolute',right:0,bottom:15,marginRight:10,color:'#0B8749',fontWeight:'500'}}>Verified</Text>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Email Address</Text>
          <TextInput onChangeText={(text) => setUserDetail({...userDetail,email:text})} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'john.doe@domain.tld'} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Address</Text>
          <TextInput onChangeText={(text) => setUserDetail({...userDetail,address:text})} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'1201 Wellington st, Seattle, USA'} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>State</Text>
          <TextInput onChangeText={(text) => setUserDetail({...userDetail,state:text})} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'Delhi'} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>City</Text>
          <TextInput onChangeText={(text) => setUserDetail({...userDetail,city:text})} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'New Delhi'} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Pin</Text>
          <TextInput onChangeText={(text) => setUserDetail({...userDetail,pin:text})} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'123456'} />
        </View>
        <TouchableOpacity onPress={() => saveUserDetail()} style={[Theme.SignInButton, Theme.shadow]}>
          <Text style={Theme.getStartedText}>Save Details</Text>
        </TouchableOpacity>
      </ScrollView>
      {
        loader ? 
        (<ActivityIndicator
          size={'large'}
          style={{position:'absolute',justifyContent:'center',height:height,width:width}}
        />) : (<></>)
      }
    </View>
  )
}

export default EditProfile