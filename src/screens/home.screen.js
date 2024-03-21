import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Avatar, TextInput, Divider} from 'react-native-paper';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import readJSONFromFirebase from '../api/readTeamList';
import Activity from '../components/activityIndicator';
import moment from 'moment';
import {MatchdataContext} from '../services/auth/matchdata';
import SearchBar from '../components/SearchBar';
const AvatarContainer = styled.View`
  align-items: center;
  margin-top: 8px;
`;

export const TextContainer = styled.View`
  padding: 2px;
  margin: 6px;
  align-items: center;
`;

const Infodiv = ({wine, lose, date}) => {
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
  const {matchdata, fetchData} = useContext(MatchdataContext);
  const [data, setData] =  useState(matchdata);
  const [issearch, setIssearch] = useState(false);
  const [searchdata, setsearchdata] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const MatchComponent = ({matchdata, searchdata}) => {
    console.log("xxxxxxx",matchdata);
    console.log("xxxxxxx2",searchdata);
    
    // Filtering the matchdata array based on searchdata
    const filteredData = matchdata.filter(match => {
      return (
        match.wine.some(wineItem =>
          wineItem.toLowerCase().includes(searchdata.toLowerCase()),
        ) ||
        match.lose.some(loseItem =>
          loseItem.toLowerCase().includes(searchdata.toLowerCase()),
        )
      );
    });
    return filteredData;
  };

 
  const dateFormat = timestamp => {
    const dateTime = moment(timestamp).format('DD-MMM-YYYY');
    return dateTime;
  };


  useEffect(() => {
    fetchData().then(() => {
      // Set loading to false after fetching data
      setLoading(false);
      // setData(matchdata);
    });
   
  }, [data]);

  // useEffect(() => {
  //   // Fetch data only if matchdata is null
  //   if (matchdata === null) {
  //     fetchData()
  //       .then((fetchedData) => {
  //         // Set loading to false after fetching data
  //         setLoading(false);
  //         setData(matchdata);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //         setLoading(false); // Ensure loading is set to false even if there's an error
  //       });
  //   }
  // }, [data, matchdata]); // Fetch data whenever fetchData or matchdata changes
  
  // // Ensure data is set once matchdata is available
  // useEffect(() => {
  //   if (matchdata !== null) {
  //     setData(matchdata);
  //     // setLoading(false);
  //   }
  // }, []); // Update data whenever matchdata changes
  




  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); // Fetch new data
    setRefreshing(false);
  };
  return (
    <View style={{backgroundColor: '#00bfff', flex: 1}}>
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchdata}
        setSearchPhrase={setsearchdata}
        setIssearch={setIssearch}
        setLoading={setLoading}
        matchdata={matchdata}
        setData={setData}
        MatchComponent={MatchComponent}
      />
      {loading && (
          <Activity  text=" Loading..."/>
        
      )}
         {matchdata && !loading && !data &&  (
    <ScrollView
    style={{backgroundColor: '#00bfff', flex: 1}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    {Object.keys(matchdata).map(key => (
      <Infodiv
        key={key}
        wine={matchdata[key].wine}
        lose={matchdata[key].lose}
        date={dateFormat(matchdata[key].createdAt)}
      />
    ))}
  </ScrollView>
      )}

      {data && !loading && (
       data.length > 0 ? (
          <ScrollView
            style={{backgroundColor: '#00bfff', flex: 1}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {Object.keys(data).map(key => (
              <Infodiv
                key={key}
                wine={data[key].wine}
                lose={data[key].lose}
                date={dateFormat(data[key].createdAt)}
              />
            ))}
          </ScrollView>
        ) : (
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log(searchdata.length);
            // if (searchdata.length < 1)
            // {
            //   setData(matchdata);
            // }
          }}>
          <View style={styles.noDataFound}>
            <Text style={{fontSize: 30}}>No data found</Text>
          </View>
          </TouchableWithoutFeedback>
        )
      ) }
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
    color: 'black',
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  noDataFound: {
    padding: 16,
    backgroundColor: '#00bfff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
