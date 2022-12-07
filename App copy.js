import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, BackHandler } from 'react-native'
import React, {useRef, useEffect, useState} from 'react'
import MapView,{PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps'
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const App = () => {
  const mapRef = useRef();
  const [region,setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });
  const [record, setRecord] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() =>{
    getLocationPermission();
  },[]);

  getLocationPermission= async()=>{
    const granted = await grantLocationAccess();
    if(granted==='granted')
    {
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
      {
        // alert('You can access this app')
        console.log('first')
      }
    }
    else
    {
      // alert('app functions may break')
    }
  }

  const grantLocationAccess=async()=>{
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    );
    return granted;
  }

  onLocationChange = async(coordinates)=>{
    console.log(coordinates)
    const camera = await mapRef.current?.getCamera();
    if(camera){
      if(record==true)
      {
        setLocations([...locations,{longitude:coordinates.longitude%100,latitude:coordinates.latitude%100}])
      }
      camera.center ={
        longitude:coordinates.longitude,
        latitude:coordinates.latitude
      }
      camera.zoom = 20
      mapRef.current?.animateCamera(camera,{duration:1000});
    }
  }


  return (
    <View style={{flex:1}}>
      <MapView
        ref={mapRef}
        style={{...StyleSheet.absoluteFill}}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        showsUserLocation={true}
        initialRegion={region}
        onUserLocationChange={(locationChangedResult) => onLocationChange(locationChangedResult.nativeEvent.coordinate)}
      >
        {
          locations.length > 0 ?
          (
            <Marker 
              key={1}
              coordinate={{
                longitude:locations[0].longitude,
                latitude:locations[0].latitude
              }}
              title={'Start'}
            />
          ) : (<></>)
        }
      <Polyline
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
      />
      </MapView>
      <View style={{flexDirection:'row',margin:20}}>
      <TouchableOpacity onPress={() => {
        if(record==true)
        {
          setRecord(false);
        }
        else
        {
          setRecord(true)
        }
      }} style={{backgroundColor:'green',padding:10,borderRadius:10}}>
        <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>{record ? 'Stop' : 'Start'} Record</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setLocations([]);
      }} style={{backgroundColor:'green',padding:10,borderRadius:10,marginLeft:5}}>
        <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>Clear</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default App