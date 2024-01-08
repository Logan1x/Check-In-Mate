import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const UserDetailsScreen = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    await AsyncStorage.setItem(
      'uname',
      username.toLowerCase().replace('@', ''),
    );
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter a unique username:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="@username"
        placeholderTextColor={'#333'}
      />
      <Image
        style={styles.image}
        source={require('../assets/user_detail_hero.png')}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefce8',
  },
  image: {
    marginVertical: 10,
    width: 500,
    height: 600,
    backgroundColor: 'transparent',
    objectFit: 'contain',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    color: '#333',
    width: '100%',
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
