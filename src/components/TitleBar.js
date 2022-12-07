import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Theme from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TitleBar = ({navigation}) => {
  return (
    <View style={Theme.titleBar}>
      <TouchableOpacity
        onPress={() => {
          // Vibration.vibrate(100);
          navigation.goBack();
        }}
        style={Theme.backButton}>
        <FontAwesome name="chevron-left" size={18} color={'#F4A120'} />
        <Text style={Theme.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={Theme.titleBarText}>SupplyValid</Text>
    </View>
  );
};

export default TitleBar;
