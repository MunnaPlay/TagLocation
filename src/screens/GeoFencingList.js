import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Header} from '../components';
import Theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetLocations} from '../api';

const GeoFencingList = ({navigation}) => {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const getAllLocations = async () => {
      const response = JSON.parse(await AsyncStorage.getItem('user'));
      const {Location} = await GetLocations(response.mobile);
      setLocations(Location);
    };
    getAllLocations();
  }, []);

  return (
    <View style={[Theme.mainContainer, {backgroundColor: '#F6F6F6'}]}>
      <Header
        title={'GeoFencing List'}
        navigation={navigation}
        isBack={true}
      />
      <View style={{padding: 20, flex: 1}}>
        <FlatList
          data={locations}
          renderItem={items => (
            <View style={{flexDirection:'row',borderRadius:5,marginBottom:15,padding:10,backgroundColor:'white',shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,}}>
              <Text style={{flex:1,fontWeight:'700',color:'black'}}>{items.item.id}</Text>
              <Text style={{flex:2,fontWeight:'700',color:'black'}}>{items.item.locationName}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MyLocation',{Locations:items.item.locations})} style={{backgroundColor:'green',padding:5,borderRadius:10,width:50}}>
                <Text style={{flex:2,color:'white',textAlign:'center',fontWeight:'600'}}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GeoFencingList;
