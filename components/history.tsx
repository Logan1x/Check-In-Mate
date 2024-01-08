import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';

export default function HistoryComponent({checkInHistory}) {
  const convertEpochToTime = epoch => {
    const date = new Date(epoch * 1000); // Multiply by 1000 to convert seconds to milliseconds
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); // Adjust the format as needed
  };

  const convertEpochToDate = epoch => {
    const date = new Date(epoch * 1000); // Multiply by 1000 to convert seconds to milliseconds
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      weekday: 'short',
    }); // Format Month and Day
  };

  return (
    <SafeAreaView style={styles.historyContainer}>
      <View style={styles.historyContainer}>
        <Text style={styles.title}>History</Text>
        {checkInHistory.length > 0 ? (
          <FlatList
            data={checkInHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.historyCard}>
                <View style={styles.historyCardImg}>
                  <Image
                    source={require('../assets/calendar-icon-light.png')}
                    style={styles.calendarIcon}
                  />
                </View>
                <View style={styles.historyCardTextContent}>
                  <Text style={styles.historyCardDate}>
                    {convertEpochToDate(item.createdAt.seconds)}
                  </Text>
                  {/* <Text style={styles.historyCardTime}>{JSON.stringify(item)}</Text> */}
                  <Text style={styles.historyCardTime}>
                    {convertEpochToTime(item.createdAt.seconds)}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyHistoryContainer}>
            <Text style={styles.emptyHistoryText}>
              No history, Check In to add history
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    backgroundColor: '#fefce8',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  emptyHistoryContainer: {
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  historyCard: {
    height: 75,
    width: '100%',
    backgroundColor: '#FED7D7',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
    elevation: 2,
  },
  historyCardTextContent: {
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  historyCardDate: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  historyCardTime: {
    fontSize: 16,
    color: '#FC8181',
  },
  historyCardImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  calendarIcon: {
    width: 80,
    height: 80,
    marginVertical: 8,
    marginHorizontal: -14,
  },
});
