import {View, Text, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Theme from '../theme';
import {TitleBar} from '../components';
import OtpInputs from 'react-native-otp-inputs';
import {verifyOtpAPI, getUserAPI} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {height, width} = useState(false);
const VerifyOTP = ({navigation, route}) => {
  const [otp, setOTP] = useState();
  const [loader, setLoader] = useState(false);

  const setVerifyCode = code => {
    if(code.length==4)
    {
      setOTP(code)
    }
  };

  const verifyOtp=async()=>{
    setLoader(true)
    const mobile = route.params.mobile;
    const response = await verifyOtpAPI(mobile, otp);
    if(response.Status==true)
    {
      setLoader(false);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      if(response.user.fullName=='' || response.user.email=='')
      {
        navigation.navigate('EditProfile');
      }
      else
      {
        navigation.navigate('UserDetails');
      }
    }
    else
    {
      setLoader(false);
      alert('Wrong OTP, Please try again')
    }
  }
  return (
    <View style={Theme.mainContainer}>
      <TitleBar navigation={navigation} />
      <View style={Theme.SendOTP}>
        <View style={Theme.otpContent}>
          <Text style={Theme.splashTitle}>Verification Code</Text>
          <Text style={Theme.splashSubTitle}>
            Enter the Verification code to complete Sign in.
          </Text>
          <View style={{height: 50, marginTop: 20}}>
            <OtpInputs
              placeholder="_"
              inputStyles={[
                {
                  backgroundColor: '#F8F8F8',
                  borderRadius: 6,
                  width: 40,
                  textAlign: 'center',
                },
                Theme.shadow,
              ]}
              handleChange={code => setVerifyCode(code)}
              numberOfInputs={4}
            />
          </View>
          <TouchableOpacity
            onPress={() => verifyOtp()}
            style={[Theme.SignInButton, Theme.shadow]}>
            <Text style={Theme.getStartedText}>Submit</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 20, textAlign: 'center'}}>
            Didn't get Verification code?{' '}
            <Text style={{color: '#FF7B00'}}>Resend Code</Text>
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

export default VerifyOTP;
