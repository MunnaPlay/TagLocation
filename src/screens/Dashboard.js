import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, BackHandler, Modal, Dimensions, TextInput } from 'react-native'
import React, {useRef, useEffect, useState} from 'react'
import {Header} from '../components';
import Theme from '../theme';
import MapView,{PROVIDER_GOOGLE, Polyline, Marker, Polygon} from 'react-native-maps'
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SaveLocationAPI} from '../api';

const {height, width} = Dimensions.get('screen');
const Dashboard = ({navigation}) => {
  const mapRef = useRef();
  const [locationName, setLocationName] = useState('');
  const [isModal, setIsModel] = useState(false);
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
    const camera = await mapRef.current?.getCamera();
    if(camera){
      if(record==true)
      {
        setLocations([...locations,{longitude:coordinates.longitude,latitude:coordinates.latitude}])
      }
      camera.center ={
        longitude:coordinates.longitude,
        latitude:coordinates.latitude
      }
      camera.zoom = 20
      mapRef.current?.animateCamera(camera,{duration:1000});
    }
  }

  const saveCoordinates=async()=>{
    if(locations.length > 0)
    {
      const response = JSON.parse(await AsyncStorage.getItem('user'));
      const dataResponse = await SaveLocationAPI(response.mobile, locationName, JSON.stringify(locations));
      if(dataResponse.Status==true)
      {
        alert('Location has been saved');
        setLocationName('');
        setLocations([]);
      }
    }
    else
    {
      alert('No Location found')
    }
  }
  return (
    <View style={[Theme.mainContainer,{backgroundColor:'#F6F6F6'}]}>
      <Header title={'Geo Fencing'} navigation={navigation} isBack={true} />
      <MapView
        ref={mapRef}
        style={{flex:1}}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        showsUserLocation={true}
        initialRegion={region}
        onUserLocationChange={(locationChangedResult) => onLocationChange(locationChangedResult.nativeEvent.coordinate)}
      >
        {
          locations.length > 0 ?
          (
            <>
            <Marker 
              key={1}
              coordinate={{
                longitude:locations[0].longitude,
                latitude:locations[0].latitude
              }}
              title={'Start'}
            />
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
      <View style={{flexDirection:'row',margin:20}}>
        <TouchableOpacity onPress={() => {
          if(record==true)
          {
            setRecord(false);
          }
          else
          {
            setIsModel(true);
            setRecord(true)
          }
        }} style={{backgroundColor:'green',padding:10,borderRadius:10}}>
          <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>{record ? 'Stop' : 'Start'} Record</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          saveCoordinates();
        }} style={{backgroundColor:'green',padding:10,borderRadius:10,marginLeft:5}}>
          <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>Save Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setLocations([]);
        }} style={{backgroundColor:'green',padding:10,borderRadius:10,marginLeft:5}}>
          <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModal}
        animationType={'slide'}
        transparent={true}
      >
        <View style={{backgroundColor:'white',alignSelf:'center',top:height/4,width:width/2,borderRadius:10,padding:10,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,}}>
          <View style={{marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:10,marginLeft:5}}>Enter Farm Name</Text>
            <TextInput onChangeText={(text) => setLocationName(text)} style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10,shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5}} placeholder={'Enter Name'} 
            />
            <TouchableOpacity onPress={() => {
              setIsModel(false);
            }} style={{backgroundColor:'green',padding:10,borderRadius:10,marginTop:15}}>
              <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <View style={{padding:20,flex:1}}>
        <View>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Photo ID Type</Text>
          <TextInput style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'Select'} />
          <FontAwesome name='chevron-down' style={{position:'absolute',right:0,bottom:15,marginRight:10,color:'#000000'}} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16,fontWeight:'500',color:'#262626',marginBottom:5,marginLeft:5}}>Photo ID Number</Text>
          <TextInput style={{backgroundColor:'#FFFFFF',borderRadius:6,paddingLeft:10}} placeholder={'87786778665'} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:13,fontWeight:'400',color:'#262626',marginBottom:5,marginLeft:5}}>Upload photo ID document</Text>
          <MaterialCommunityIcons name="image" size={60} color={'#979797'} style={{marginLeft:5}} />
          <Text style={{marginLeft:10,fontWeight:'700',color:'#000000'}}>Add More +</Text>
        </View>
        <TouchableOpacity onPress={() => checkUser()} style={[Theme.SignInButton, Theme.shadow]}>
          <Text style={Theme.getStartedText}>Update</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

export default Dashboard