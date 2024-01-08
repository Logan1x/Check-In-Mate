import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/hero_logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>CheckInMate</Text>
      </View>
      <View style={styles.subContainer}>
        <Image
          source={require('../assets/onboarding_hero.png')}
          style={styles.image}
        />
        <Text style={styles.tagline}>Track habits, build a better you!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserDetails')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce8',
    alignItems: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },

  logoImage: {
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
    objectFit: 'contain',
    marginRight: 2,
  },

  logoText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
  },

  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 400,
    height: 400,
    marginBottom: 50,
    backgroundColor: 'transparent',
    objectFit: 'contain',
  },
  tagline: {
    marginBottom: 50,
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 20,
    backgroundColor: '#3F3D56',
    padding: 14,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
