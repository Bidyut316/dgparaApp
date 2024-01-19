import React,{useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked,setIssearch}) => {
  const inputRef = useRef();
  const handleSearchPress = (event) => {
    const inputValue = event.nativeEvent.text;
    console.log('Editing ended. Do something here. Input value:', inputValue);
    console.log(inputValue.length);
    if(inputValue.length==0){
      setClicked(false);
      setIssearch(false);
    }
    setSearchPhrase(inputValue);
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
              setClicked(false);
              setIssearch(false);
              console.log('Press button...');
              setSearchPhrase('');
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
          // value={searchPhrase}
          // onChangeText={setSearchPhrase}
          onEndEditing={(event) => handleSearchPress(event)}
        />
        <Ionicons
          name="search-outline"
          size={20}
          color="white"
          style={{marginRight: 16,padding:6,backgroundColor:'gray',borderRadius:4,}}
          onPress={() => {
           if(searchPhrase.length>0){
              setIssearch(true);

           }
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
