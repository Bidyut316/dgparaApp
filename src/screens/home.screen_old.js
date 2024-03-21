import React, {useState, useEffect,useContext} from 'react';
import {View, Text, StyleSheet, Image, ScrollView,RefreshControl,TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Avatar, TextInput, Divider} from 'react-native-paper';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import readJSONFromFirebase from '../api/readTeamList';
import Activity from '../components/activityIndicator';
import moment from 'moment';
import { MatchdataContext } from '../services/auth/matchdata'
import SearchBar from '../components/SearchBar'
const AvatarContainer = styled.View`
  align-items: center;
  margin-top: 8px;
`;

export const TextContainer = styled.View`
  padding: 2px;
  margin: 6px;
  align-items: center;
`;

const Infodiv = ({ wine, lose,date}) => {
  console.log('<---------------------------------------->');
  // console.log('Keyyyyyyyyyyyyyyy ', key);
  // console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.divdate}>{date}</Text>
      <View style={styles.dividerContainer} />
      <AvatarContainer>
        <Ionicons name="trophy" size={38} color="#0e7afb" />
      </AvatarContainer>
      <TextContainer>
        <Text style={styles.divtext}>{wine[0]}</Text>
        <Text style={styles.divtext}>{wine[1]}</Text>
      </TextContainer>
      <View style={styles.dividerContainer} />
      <TextContainer>
        <Text style={styles.divtext}>{lose[0]}</Text>
        <Text style={styles.divtext}>{lose[1]}</Text>
      </TextContainer>
    </View>
  );
};

export const HomeScreen = () => {
  const { matchdata, fetchData } = useContext(MatchdataContext);
  // const [data, setData] = useState(null);
  const [issearch, setIssearch] = useState(false);
  const [searchdata, setsearchdata] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading,setLoading]=useState(true);
//   const [searchPhrase, setSearchPhrase] = useState("");
// console.log("searchPhrase::::",searchPhrase);
let count = 0; // Counter variable
function renderMatchData(matchdata, searchdata) {
  let count = 0;

  const matchedElements = Object.keys(matchdata).map(key => {
    const found =
      matchdata[key].wine.some(
        wineItem => wineItem.toLowerCase().includes(searchdata.toLowerCase())
      ) ||
      matchdata[key].lose.some(
        loseItem => loseItem.toLowerCase().includes(searchdata.toLowerCase())
      );

    if (found) {
      count++; // Increment counter if data is found
      console.log("Inside Found.....", matchdata[key].wine);
      return (
        <Infodiv
          key={key}
          wine={matchdata[key].wine}
          lose={matchdata[key].lose}
          date={dateFormat(matchdata[key].createdAt)}
        />
      );
    }
  });

  if (count === 0) {
    return (
      
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      
        if (searchdata.length < 1) {
          setIssearch(false);
        }
      }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30 }}>No data found</Text>
      </View>
    </TouchableWithoutFeedback>
      
    );
  }

  return (
    <ScrollView style={{ backgroundColor: 'green', flex: 1 }}>
      {matchedElements}
    </ScrollView>
  );
}



  const dateFormat = (timestamp) => {
    const dateTime = moment(timestamp).format('DD-MMM-YYYY');
    return dateTime;
  };
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const fetchedData = await readJSONFromFirebase();
    //     console.log('fetchedData===  ', fetchedData);
    //     if (fetchedData) {
    //       const sortedData = Object.values(fetchedData)
    //         .map(item => ({
    //           ...item,
    //           createdAt: new Date(item.createdAt), // Parse createdAt as Date
    //         }))
    //         .sort((a, b) => b.createdAt - a.createdAt);

    //       setData(sortedData);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    fetchData().then(() => {
      // Set loading to false after fetching data
      setLoading(false);
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh =async () => {
    setRefreshing(true);
    await fetchData(); // Fetch new data
    setRefreshing(false);
  };
  return (
    <View style={{backgroundColor: '#00bfff',flex:1}}>
     <SearchBar clicked={clicked} setClicked={setClicked} searchPhrase={searchdata}
        setSearchPhrase={setsearchdata} setIssearch={setIssearch} setLoading={setLoading} />
      {loading &&(
        <View style={styles.indicatorWrapper}>
        <Activity text=" Loading..." />
      </View>
      )}
    {!issearch ? (
    <ScrollView style={{backgroundColor: '#00bfff',flex:1}}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
     
      {matchdata && (
        Object.keys(matchdata).map(key => (
          <Infodiv key={key} wine={matchdata[key].wine} lose={matchdata[key].lose} date={dateFormat(matchdata[key].createdAt)} />
        ))
      ) 
      }
    
    </ScrollView>
    ):(
      <View style={{backgroundColor: '#00bfff',flex:1}}>
       
          {searchdata.length === 0 && !issearch ? (
        <View style={styles.noDataFound}>
          <Text style={{ fontSize: 30 }}>No data found44</Text>
        </View>
        
      ) : (
        <View style={{backgroundColor: 'green',flex:1}}>
          {renderMatchData(matchdata, searchdata)}
         {/* {Object.keys(matchdata).map(key => {
            const found =matchdata[key].wine.some(
                wineItem => wineItem.toLowerCase().includes(searchdata.toLowerCase())
              ) ||
              matchdata[key].lose.some(
                loseItem => loseItem.toLowerCase().includes(searchdata.toLowerCase())
              );

            if (found) {
              count++; // Increment counter if data is found
             console.log("Inside Found.....",matchdata[key].wine);
             return(
            
                <Infodiv
                  key={key}
                  wine={matchdata[key].wine}
                  lose={matchdata[key].lose}
                  date={dateFormat(matchdata[key].createdAt)}
                />
         )
            }
           
          })} */}
        </View>

       
      )}
     
     {/* {count === 0 && (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text style={{ fontSize: 30 }}>No data found 66</Text>
        </View>
      )} */}
    </View>

    )}
     
    </View>
    
 
  );  
};

const styles = StyleSheet.create({
  divtext: {
    fontSize: 22,
    color: 'black',
  },
  container: {
    marginHorizontal: 10,
    marginTop: 12,
    backgroundColor: '#cbe314',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dividerContainer: {
    backgroundColor: 'black',
    padding: 0.5,
    width: '95%',
  },
  divdate: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color:'black'
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:90,
  },
  noDataFound: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00bfff',
    alignSelf:'center',
  },
});
