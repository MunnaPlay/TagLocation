import {View, Text, Image, Vibration, TouchableOpacity} from 'react-native';
import React from 'react';
import Theme from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HeaderMenu = ({navigation, title, handleMainMenu, profileMenu}) => {
  return (
    <View style={[Theme.titleBar, {backgroundColor: '#F4A120'}]}>
      <FontAwesome
        onPress={() => {
          Vibration.vibrate(100);
          handleMainMenu(true);
        }}
        name={'bars'}
        size={20}
        color={'white'}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: 10,
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {title}
      </Text>
      <FontAwesome
        onPress={() => navigation.navigate('Notification')}
        name="bell"
        size={18}
        color={'white'}
        style={{marginRight: 10}}
      />
      <TouchableOpacity onPress={() => profileMenu(true)}>
        <Image
          source={{
            uri: `https://avatars.dicebear.com/api/avataaars/${Math.random()}.png?size=32&radius=15&backgroundColor=lightgreen`,
          }}
          style={{height: 22, width: 22}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;
