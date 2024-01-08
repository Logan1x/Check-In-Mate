import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

import {db} from '../config/firebaseConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchData = async () => {
  try {
    const uname = await AsyncStorage.getItem('uname');

    const q = query(
      collection(db, 'check-ins'),
      orderBy('createdAt', 'desc'),
      where('createdBy', '==', uname),
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());

    // console.log('data', data);

    const totalCount: Number = querySnapshot.size;
    return {data, totalCount};
  } catch (error) {
    console.error('Error fetching check-in history:', error);
  }
};

const saveDataLocally = async checkInDate => {
  try {
    await AsyncStorage.setItem(
      'checkInDate',
      checkInDate.toISOString().split('T')[0],
    );
  } catch (error) {
    console.error('Error saving data locally:', error);
  }
};

export const postData = async () => {
  try {
    const checkInDate = new Date();
    const createdBy = await AsyncStorage.getItem('uname');

    saveDataLocally(checkInDate);

    await addDoc(collection(db, 'check-ins'), {
      createdAt: checkInDate,
      createdBy,
    });

    // await createOrUpdateStreak(); // FIXME: This is causing a bug

    return true; // Add this line
  } catch (error) {
    console.error('Error adding document:', error);
    return false; // And this line
  }
};

export const createOrUpdateStreak = async () => {
  try {
    const uname = await AsyncStorage.getItem('uname');

    //get streaks from firebase
    const q = query(collection(db, 'streaks'), where('uname', '==', uname));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());

    console.log('streaks data', data);

    //if streaks exist
    if (data.length > 0) {
      const streak = data[0].streak;
      const prevDate = data[0].prevDate;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (prevDate === yesterday.toISOString().split('T')[0]) {
        //if prevDate is yesterday
        const newStreak = streak + 1;

        //update streaks
        const streakRef = doc(db, 'streaks', data[0].id);
        await updateDoc(streakRef, {
          streak: newStreak,
          prevDate: today.toISOString().split('T')[0],
        });
      } else if (prevDate === today.toISOString().split('T')[0]) {
        //if prevDate is today
        //do nothing
      } else {
        //if prevDate is not yesterday or today
        //reset streak to 1
        const streakRef = doc(db, 'streaks', data[0].id);
        await updateDoc(streakRef, {
          streak: 0,
          prevDate: today.toISOString().split('T')[0],
        });
      }
    } else {
      //if streaks do not exist
      const today = new Date();
      const streakRef = doc(db, 'streaks', uname);
      await setDoc(streakRef, {
        // Use setDoc instead of addDoc
        uname: uname,
        streak: 0,
        prevDate: today.toISOString().split('T')[0],
      });
    }
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};

const deleteLocalData = async () => {
  try {
    await AsyncStorage.removeItem('checkInDate');
  } catch (error) {
    console.error('Error deleting data locally:', error);
  }
};

// deleteLocalData();
