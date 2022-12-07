import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CommoditiesFilter = ({navigation, handleMainMenu, filter}) => {
  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF',position:'absolute',top:0,bottom:0,left:0,right:0}}>
      <View style={{marginTop:28,flexDirection:'row',padding:20}}>
        <Text style={{textAlign:'center',flex:1,fontSize:20,fontWeight:'500',color:'#000000'}}>Filter</Text>
        <FontAwesome onPress={() => filter(false)} name='close' style={{marginRight:20,color:'#000000'}} size={18} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'EditProfile' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Commodity</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardNavigation', { screen: 'AccountDetails' })} style={{padding:15,flexDirection:'row',alignItems:'baseline'}}>
        <Text style={{marginLeft:10,color:'#000000',fontSize:18}}>Location</Text>
        <FontAwesome name='chevron-right' style={{flex:1,textAlign:'right',marginRight:20}} color={'#111111'} size={16} />
      </TouchableOpacity>
      <Text style={{color:'red',textAlign:'center'}}>note: filter screen need to be revised </Text>
    </View>
  )
}

export default CommoditiesFilter