import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, BackHandler, Modal, Dimensions, TextInput } from 'react-native'
import React, {useRef, useEffect, useState} from 'react'
import {Header} from '../components';
import Theme from '../theme';
import MapView,{PROVIDER_GOOGLE, Polyline, Marker, Polygon} from 'react-native-maps'
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const {height, width} = Dimensions.get('screen');
const MyLocation = ({navigation,route}) => {
  const mapRef = useRef();
  const [locations, setLocations] = useState([]);
  const [region,setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  const getMyLocation=async()=>{
    const camera = await mapRef.current?.getCamera();
    const parseData = JSON.parse(await route.params.Locations);
    if(camera){
      setLocations(parseData);
      camera.center ={
        longitude:parseData[0].longitude,
        latitude:parseData[0].latitude
      }
      camera.zoom = 20
      mapRef.current?.animateCamera(camera,{duration:1000});
    }
  }

  return (
    <View style={[Theme.mainContainer,{backgroundColor:'#F6F6F6'}]}>
      <Header title={'My GeoFencing Location'} navigation={navigation} isBack={true} />
      <MapView
        ref={mapRef}
        style={{flex:1}}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        showsUserLocation={true}
        initialRegion={region}
        onMapLoaded={(text) => getMyLocation()}
      >
        {
          locations.length > 0 ?
          (
            <>
            <Polygon
              coordinates={locations}
              strokeColor="#000"
              strokeColors={[
                '#7F0000',
                '#00000000',
                '#B24112',
                '#E5845C',
                '#238C23',
                '#7F0000'
              ]}
              strokeWidth={3}
              fillColor="red"
            /></>
          ) : (<></>)
        }
      </MapView>
    </View>
  )
}

export default MyLocation