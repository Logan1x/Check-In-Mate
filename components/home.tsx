import {Image, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import CheckInComponent from './checkin';
import HistoryComponent from './history';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [checkInHistory, setCheckInHistory] = useState([]);

  useEffect(() => {}, [checkInHistory]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <View style={{...backgroundStyle, ...styles.componentContainer}}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.text}>Welcome!!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/user_icon_light.png')}
            style={styles.logoImage}
          />
        </View>
      </View>

      <CheckInComponent setCheckInHistory={setCheckInHistory} />
      <HistoryComponent checkInHistory={checkInHistory} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    backgroundColor: '#fefce8',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  imageContainer: {
    borderRadius: 50,
    padding: 4,
    backgroundColor: '#bef264',
    elevation: 5,
  },

  logoImage: {
    width: 30,
    height: 30,
    objectFit: 'cover',
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
});
