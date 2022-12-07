import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProfileSideMenu = ({navigation, closeMenu}) => {
  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF',position:'absolute',top:0,bottom:0,left:0,right:0,zIndex:100}}>
      <View style={{marginTop:28,flexDirection:'row',padding:20}}>
        <Image source={{uri:'https://avatars.dicebear.com/api/adventurer/your-custom-seed.png'}} style={{height:100,width:100,backgroundColor:'white',borderRadius:100}} />
        <View style={{padding:15}}>
            <Text style={{fontSize:26,color:'#000000'}}>John Doe</Text>
            <Text style={{fontSize:14,color:'#000000'}}>John@company.com</Text>
        </View>
        <FontAwesome onPress={() => closeMenu()} name='close' style={{marginLeft:20}} size={18} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'EditProfile' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='edit' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Edit Profile</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'AccountDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='bank' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Account Details</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'OrganizationDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='bank' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Organization Details</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'KycDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='bank' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>KYC Details</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'Settings' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='cog' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Settings</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <View style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='power-off' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Log Out</Text>
      </View>
    </View>
  )
}

export default ProfileSideMenu