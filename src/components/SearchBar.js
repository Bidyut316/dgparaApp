import React,{useRef,useContext,useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked,setIssearch,setLoading,matchdata,setData,MatchComponent}) => {
  const inputRef = useRef();
  const searchData=useRef();
  const handleSearchPress = (event) => {
    // setIssearch(false);
    const inputValue = event.nativeEvent.text;
    console.log('Editing ended. Do something here. Input value:', inputValue);
    if(inputValue == undefined || inputValue.length==0){
      setClicked(false);
      setData(matchdata)
      // setSearchPhrase(inputValue);
    }else{
      setSearchPhrase(inputValue);
    }
    searchData.current=inputValue;
    // setSearchPhrase(inputValue);
  };





  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
          
        {/* search Icon */}
        {clicked && (
          <Ionicons
            name="close-circle"
            size={25}
            color="gray"
            style={{ opacity: 1,marginLeft:16}}
            onPress={() => {
              Keyboard.dismiss();
              setLoading(true);
              setClicked(false);
              // setIssearch(false);
              console.log('Pres cross button...');
              setSearchPhrase('');
              inputRef.current.clear();
              
              setData(matchdata);
            }}
          />
          
        )}
       

        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          onFocus={() => {
            setClicked(true);
          }}
          ref={inputRef}
          onChangeText={text => inputRef.text = text }
          // onChangeText={setSearchPhrase}
          onEndEditing={(event) => handleSearchPress(event)}
        />
        <Ionicons
          name="search-outline"
          size={20}
          color="white"
          style={{marginRight: 16,padding:6,backgroundColor:'gray',borderRadius:4,}}
          onPress={async () => {
            
            // setLoading(false);
          // setLoading(true)
          // console.log("press Search button..",searchPhrase.length,searchData.current);
    await setSearchPhrase(searchData.current);
    // console.log("press Search len  button..",searchPhrase.length,searchPhrase,searchData.current);

           if( searchData.current !== undefined && searchData.current.length>0){
            setLoading(true);
            setData(MatchComponent({ matchdata: matchdata, searchdata: searchData.current }));
              // inputRef.current.clear();
              // setIssearch(true);
           }
    // setLoading(false)

          }}
        />
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal:15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
 backgroundColor: '#00bfff',
 marginBottom:10,
  },
  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 15,
    width: '85%',
    paddingRight:20,
  },
});
