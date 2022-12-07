import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import React,{useState, useEffect} from 'react';
import Theme from '../theme';
import {TitleBar} from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {saveUserFirstTime, SendSMSAPI} from '../api';

const {height, width} = Dimensions.get('screen');
const MobileScreen = ({navigation}) => {
  const [mobile, setMobile] = useState();
  const [loader, setLoader] = useState(false);

  const SendOTP=async(mobile)=>{
    setLoader(true);
    if(mobile==undefined || mobile=='' || mobile.length < 10)
    {
      setLoader(false);
      alert('Input can not blank')
    }
    const otp = Math.floor(1111 + (9999 - 1111) * Math.random());;
    const response = await saveUserFirstTime(mobile, otp);
    if(response.Status==true)
    {
      const msg = `${otp} is the OTP for your request.Regards AgriOrigin Pvt Ltd`;
      const smsRes = await SendSMSAPI(mobile, msg);
      if(smsRes==true)
      {
        setLoader(false)
        alert('OTP has been sent')
        navigation.navigate('VerifyOTP',{mobile:mobile});
      }
    }
  }

  return (
    <View style={Theme.mainContainer}>
      <TitleBar navigation={navigation} />
      <View style={Theme.SendOTP}>
        <View style={Theme.otpContent}>
          <Text style={Theme.splashTitle}>Start with Phone Number</Text>
          <Text style={Theme.splashSubTitle}>
            You will get a code via SMS. Operator rates may apply.
          </Text>
          <View style={[Theme.mobileInput]}>
            <FontAwesome name="mobile-phone" size={32} color={'#434040'} />
            <TextInput
              placeholder="Mobile Number"
              keyboardType="number-pad"
              maxLength={10}
              placeholderTextColor={'#FF7B00'}
              style={{marginLeft: 8, fontSize: 18, color: '#FF7B00'}}
              onChangeText={(text) => setMobile(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              // Vibration.vibrate(100);
              SendOTP(mobile);
            }}
            style={[Theme.SignInButton, Theme.shadow]}>
            <Text style={Theme.getStartedText}>Next</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 20, textAlign: 'center'}}>
            By signing up, you agree to our{' '}
            <Text style={{color: '#FF7B00'}}>Terms</Text> and{' '}
            <Text style={{color: '#FF7B00'}}>Conditions of Use</Text>
          </Text>
        </View>
      </View>
      {
        loader ? 
        (<ActivityIndicator
          size={'large'}
          style={{position:'absolute',justifyContent:'center',height:height,width:width}}
        />) : (<></>)
      }
    </View>
  );
};

export default MobileScreen;