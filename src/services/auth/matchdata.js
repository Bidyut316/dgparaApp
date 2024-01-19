import React, {useState, createContext, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import readJSONFromFirebases from '../../api/readTeamList';

export const MatchdataContext = createContext();

export const MatchdataContextProvider = ({children}) => {
  const [matchdata, setMatchdata] = useState(null);

  const fetchData = async () => {
    try {
      const fetchedData = await readJSONFromFirebases();
      // console.log('fetchedData===  ', fetchedData);

      if (fetchedData) {
        // sort data date time wise
        const sortedData = Object.values(fetchedData)
          .map(item => ({
            ...item,
            createdAt: new Date(item.createdAt), // Parse createdAt as Date
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

          setMatchdata(sortedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <MatchdataContext.Provider value={{matchdata,setMatchdata, fetchData}}>
      {children}
    </MatchdataContext.Provider>
  );
};
