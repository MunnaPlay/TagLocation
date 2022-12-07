// import React,{useState} from 'react';
// import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native'
// import Geolocation from 'react-native-geolocation-service';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// const styles = StyleSheet.create({
//  container: {
//   flex:1
//  },
//  map: {
//    ...StyleSheet.absoluteFillObject,
//  },
// });

// // const [lang, setLang] = useState('');
// // const [late, setLate] = useState('');
// export default () => (
//    <View style={styles.container}>
//      <MapView
//        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//        style={styles.map}
//        region={{
//          latitude: 29.5264884,
//          longitude: 73.4530878,
//          latitudeDelta: 0.00120,
//          longitudeDelta: 0.00090,
//        }}
//      >
//       <Marker
//         key={1}
//         coordinate={{latitude: 29.5264884,
//           longitude: 73.4530878,}}
//         title={'fddf'}
//         description={'dfdfdf'}
//       />
//      </MapView>
//   </View>
// );
import React,{useEffect, useRef, useState} from 'react'
import { View, Text, PermissionsAndroid, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import {Geolocation,navigator} from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Camera } from 'react-native-maps';
import { usePosition } from 'use-position';

const {width, height} = Dimensions.get('screen');
const App = () => {
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [corner, setCorner] = useState('First');
  const [locations, setLocations] = useState([]);

  // const {
  //   latitude,
  //   longitude,
  //   speed,
  //   timestamp,
  //   accuracy,
  //   heading,
  //   error,
  // } = usePosition(true);

  const mapRef = useRef(null);
  useEffect(() =>{
    getLocationPermissions();
  },[]);


  const initialPosition = {
    latitude:  20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  } 

  const pinMyLocation = async()=>{
    // Geolocation.clearWatch()
    // console.log('first')
    // Geolocation.watchPosition(
    //   position =>
    //   console.log(position)
    // )
    // Geolocation.getCurrentPosition(
    //   async position => {
    //     if(corner=='First')
    //     {
    //       setLocations([...locations,{long:position.coords.longitude,lat:position.coords.latitude}]);
    //       setCorner('Second');
    //     }
    //     if(corner=='Second')
    //     {
    //       setLocations([...locations,{long:position.coords.longitude,lat:position.coords.latitude}]);
    //       setCorner('Third');
    //     }
    //     if(corner=='Third')
    //     {
    //       setLocations([...locations,{long:position.coords.longitude,lat:position.coords.latitude}]);
    //       setCorner('Fourth');
    //     }
    //     if(corner=='Fourth')
    //     {
    //       alert('All Four Corner Done')
    //     }
    //   },
    //   error => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //   },
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 0},
    // );
  }

  // const getMyLocations=async()=>{
  //   // console.log(locations);
  //   alert(JSON.stringify(locations))
  // }

  const getLocationPermissions=async()=>{
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
      {
        title: 'DemoApp',
        message: 'DemoApp would like access to your location ',
      },
    );
    if(granted==='granted')
    {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            // console.log(position)
            const camera = await mapRef.current?.getCamera();
            // console.log('camera====>',camera)
            if(camera){
              camera.center ={
                longitude:position.coords.longitude,
                latitude:position.coords.latitude
              }
              camera.zoom = 13.4
              mapRef.current?.animateCamera(camera,{duration:1000})
              // console.log('new camera',camera.zoom )
            }
            setLong(position.coords.longitude);
            setLat(position.coords.latitude);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1, interval:1},
        );
      } else {
        console.log('permission denied');
      }
    }
  }
  return (
    <View style={{flex:1}}>
      {/* <Text>{latitude}</Text> */}
      {/* <code>
      latitude: {latitude}<br/>
      longitude: {longitude}<br/>
      speed: {speed}<br/>
      timestamp: {timestamp}<br/>
      accuracy: {accuracy && `${accuracy} meters`}<br/>
      heading: {heading && `${heading} degrees`}<br/>
      error: {error}
    </code> */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialPosition}
        showsUserLocation={true}
        followsUserLocation={true}
        // onUserLocationChange={(data) => console.log(data)}
        // onRegionChange={(data) => console.log(data)}
        // onRegionChangeComplete={(data) => console.log(data)}
      >
        {
          locations.map((data,index) =>{
            return(<Marker
              key={index}
              coordinate={{latitude: data.lat,
              longitude: data.long}}
              title={'fddf'}
              description={'dfdfdf'}
          />)
          })
        }
        {/* {
          locations.length==2 ?
          (
            <><Marker
          key={1}
          coordinate={{latitude: locations[0].lat,
            longitude: locations[0].long}}
          title={'fddf'}
          description={'dfdfdf'}
        />
        <Marker
          key={2}
          coordinate={{latitude: locations[1].lat,
            longitude: locations[1].long}}
          title={'fddf'}
          description={'dfdfdf'}
        /></>
          ) : (<></>)
        }
        {
          locations.length==3 ?
          (
            <><Marker
          key={1}
          coordinate={{latitude: locations[0].lat,
            longitude: locations[0].long}}
          title={'fddf'}
          description={'dfdfdf'}
        />
        <Marker
          key={2}
          coordinate={{latitude: locations[1].lat,
            longitude: locations[1].long}}
          title={'fddf'}
          description={'dfdfdf'}
        />
        <Marker
          key={3}
          coordinate={{latitude: locations[2].lat,
            longitude: locations[2].long}}
          title={'fddf'}
          description={'dfdfdf'}
        />
        </>
          ) : (<></>)
        } */}
      </MapView>
      <TouchableOpacity onPress={()=> pinMyLocation()} style={{backgroundColor:'orange',padding:10,margin:10,borderRadius:10}}>
        <Text style={{textAlign:'center',color:'green',fontWeight:'900'}}>Pin My {corner} Location {locations.length}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=> getMyLocations()} style={{backgroundColor:'orange',padding:10,margin:10,borderRadius:10}}>
        <Text style={{textAlign:'center',color:'green',fontWeight:'900'}}>Get My Locations</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default App