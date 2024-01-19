import React, {useState, useCallback, useEffect, useContext} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

async function readJSONFromFirebase() {
    try {
      const db = firebase.database();
      const myRef = db.ref('data');
      const snapshot = await myRef.once('value');
      const alldata = {};
  
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
    
        alldata[key] = data;
      });
    
      // console.log("Data: =================>", alldata);
  
      return alldata;
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
      return null;
    }
  }

  export default readJSONFromFirebase;