import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SideMainMenu = ({navigation, handleMainMenu}) => {
  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF',position:'absolute',top:0,bottom:0,left:0,right:0,zIndex:100}}>
      <View style={{marginTop:28,flexDirection:'row',padding:20,justifyContent:'flex-end'}}>
        <FontAwesome onPress={() => handleMainMenu(false)} name='close' style={{marginRight:20}} size={18} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'EditProfile' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='edit' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>My Auction</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'AccountDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='bank' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>My Trade</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'OrganizationDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='bank' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Ledger</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'KycDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <FontAwesome name='bank' style={{marginLeft:20,backgroundColor:'#00C56912'}} color={'#111111'} size={18} />
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Service Request</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
    </View>
  )
}

export default SideMainMenu