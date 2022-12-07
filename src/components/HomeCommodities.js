import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Commodities} from '../constants'

const HomeCommodities = ({filter}) => {

  const renderData =(item)=>{
    return(
      <View style={{backgroundColor:'#0EB214',marginRight:10,borderRadius:5}}>
        <Image source={(item.image)} style={{height:75,width:100,borderTopLeftRadius:5,borderTopRightRadius:5}} />
        <Text style={{color:'white',textAlign:'center',padding:5}}>Channa</Text>
      </View>
    )
  }

  return (
    <View style={{backgroundColor:"#FFFFFF",padding:20,paddingTop:10,paddingBottom:10}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'#363636',fontWeight:'500',flex:1}}>Commodities</Text>
            <FontAwesome onPress={() => filter(true)} name='filter' color={'#000000'} size={18} style={{marginRight:5}} />
        </View>
        <FlatList 
          data={Commodities}
          horizontal={true}
          style={{marginTop:10}}
          renderItem={(items) => renderData(items.item)}
        />
    </View>
  )
}

export default HomeCommodities