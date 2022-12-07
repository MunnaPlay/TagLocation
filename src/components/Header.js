import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import Theme from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Header = ({navigation, title, isBack}) => {
  return (
    <View style={[Theme.titleBar,{backgroundColor:"#F4A120"}]}>
      {
        isBack ? 
        (<FontAwesome onPress={() => navigation.goBack()} name={isBack ? "chevron-left" : "bars"} size={20} color={'white'} />) : (<></>)
      }
      <Text style={{flex:1,marginLeft:10,fontSize:18,fontWeight:'bold',color:'white'}}>{title}</Text>
      {/* <Entypo name="old-phone" size={18} color={'white'} style={{marginRight:10}} /> */}
    </View>
  )
}

export default Header