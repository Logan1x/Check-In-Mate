import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchData, postData} from '../services/check-in-service';

const CheckInComponent = ({setCheckInHistory}) => {
  const [showCheckIn, setShowCheckIn] = useState(true);
  const [reFetchData, setReFetchData] = useState(false);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect to refresh the data when the user checks in
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const storedDate = await AsyncStorage.getItem('checkInDate');
      const {data, totalCount} = await fetchData();
      setTotalRecordCount(totalCount);
      setCheckInHistory(data);

      // Get the current date in the format YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];
      if (storedDate === currentDate) {
        setShowCheckIn(false);
      }

      setIsLoading(false);
    })();
  }, [reFetchData]);

  // useEffect to fetch the data when the component is mounted
  useEffect(() => {
    (async () => {
      const storedDate = await AsyncStorage.getItem('checkInDate');
      const {data, totalCount} = await fetchData();
      setTotalRecordCount(totalCount);
      setCheckInHistory(data);

      // Get the current date in the format YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];
      if (storedDate === currentDate) {
        setShowCheckIn(false);
      } else {
        setShowCheckIn(true);
      }
    })();
  }, []);

  const handleClick = async () => {
    try {
      const success = await postData();
      if (success) {
        setReFetchData(true);
        setShowCheckIn(false);
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkInContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#805ad5"
            style={styles.loadingContainer}
          />
        ) : showCheckIn ? (
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={handleClick}>
            <Text style={styles.button}>Check-In</Text>
          </TouchableHighlight>
        ) : (
          <View style={styles.checkedInContainer}>
            <Text style={styles.checkedInCountText}>{totalRecordCount}</Text>
            <Text style={styles.checkedInText}>Check-In's Done</Text>
          </View>
        )}
        <View style={styles.bgImg}>
          <Image
            source={require('../assets/check-icon-light.png')}
            style={styles.checkMarkIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckInComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefce8',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  checkInContainer: {
    height: 220,
    width: '100%',
    backgroundColor: '#ecfccb',
    justifyContent: 'flex-end',
    position: 'relative',
    borderRadius: 10,
    elevation: 5,
  },

  loadingContainer: {
    paddingVertical: 20,
    margin: 20,
    alignSelf: 'flex-start',
    zIndex: 1,
  },

  checkedInContainer: {
    justifyContent: 'flex-end',
    margin: 20,
  },

  checkedInCountText: {
    fontSize: 36,
    color: '#4d7c0f',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },

  checkedInText: {
    fontSize: 16,
    color: '#4d7c0f',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },

  buttonContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    backgroundColor: '#bef264',
    margin: 20,
    color: '#4d7c0f',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    zIndex: 1,
    elevation: 5,
  },
  button: {
    fontSize: 20,
    color: '#4d7c0f',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  bgImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  checkMarkIcon: {
    width: 200,
    height: 200,
    margin: -50,
  },
});
