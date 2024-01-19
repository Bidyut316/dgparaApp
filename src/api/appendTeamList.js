import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';


async function appendMatchData(data) {
  try {
    const db = firebase.database();
    const myRef = db.ref('data');
    // console.log(data);
    const msg= await myRef
      .push(data)
      .then(() => {
        return 'Data stored successfully in Firebase';
      })
      .catch(error => {
        console.error('Error storing data in Firebase:', error);
        return 'Something went wrong.';
      });
      return msg
  } catch (error) {
    console.error('Error appending data to JSON in Firebase:', error);
    return 'Something went wrong..';
  }
}

  export default appendMatchData;