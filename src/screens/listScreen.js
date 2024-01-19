import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, ScrollView, Text,TouchableOpacity,RefreshControl} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {MatchdataContext} from '../services/auth/matchdata';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SortableHeader = ({ text, sortData }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.headText}>
        {text}
      </Text>
      <TouchableOpacity onPress={() => sortData(text)}>
        <Ionicons name='arrow-up-outline' size={25} color='purple' />
      </TouchableOpacity>
    </View>
  );
}

export const ListScreen = () => {
  const [data, setData] = useState({
    tableHead: ['Si.No', 'Name', 'Win', 'Lose'],
    widthArr: [55, 196, 70, 70],
    tableData: [],
  });
  const [refreshing2, setRefreshing2] = useState(false);
  const [fdata, setFdata] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const { matchdata } = useContext(MatchdataContext);

  const sortData = (sortBy) => {
    const sortedData = [...fdata].sort((a, b) => {
      let index = sortBy === 'Win' ? 2 : 3;
      return parseInt(b[index], 10) - parseInt(a[index], 10);
    });

    setData(prevData => ({
      ...prevData,
      tableData: sortedData.map((rowData, index) => [`${index + 1}`, ...rowData.slice(1)]),
    }));

    setSortOrder(sortBy);
  };

  useEffect(() => {
    if (!matchdata) return;

    const uniqueNamesCount = {};
    Object.values(matchdata).forEach(item => {
      item.lose.forEach(name => {
        const trimmedName = name.trim();
        uniqueNamesCount[trimmedName] = uniqueNamesCount[trimmedName] || { winCount: 0, loseCount: 0 };
        uniqueNamesCount[trimmedName].loseCount++;
      });
      item.wine.forEach(name => {
        const trimmedName = name.trim();
        uniqueNamesCount[trimmedName] = uniqueNamesCount[trimmedName] || { winCount: 0, loseCount: 0 };
        uniqueNamesCount[trimmedName].winCount++;
      });
    });

    const formattedData = Object.entries(uniqueNamesCount).map(([name, {winCount, loseCount}], index) => [
      `${index + 1}`,
      name,
      winCount.toString(),
      loseCount.toString(),
    ]);

    setFdata(formattedData);
    setData(prevData => ({
      ...prevData,
      tableData: formattedData,
    }));
  }, [matchdata]);

  if (!matchdata) {
    return <Text>Loading...</Text>;
  }

  const onRefresh = async () => {
    setRefreshing2(true);
  
    try {
      // Your asynchronous logic here (e.g., data fetching)
      console.log("reload list...");
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      // Ensure that setRefreshing2 is called within the finally block
      setRefreshing2(false);
    }
  };
  
  return (
    <View>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'purple'}}>
            <Row
              data={ ['Si.No', 'Name',  <SortableHeader text="Win" sortData={sortData} />, <SortableHeader text="Lose" sortData={sortData} />]}
              widthArr={data.widthArr}
              style={styles.head}
              textStyle={styles.headText}
            />
            
          </Table>
          <ScrollView  refreshControl={<RefreshControl refreshing={refreshing2} onRefresh={onRefresh} />} >
            <Table borderStyle={{borderWidth: 1, borderColor: 'purple'}}>
              {data.tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={data.widthArr}
                  style={styles.rowSection}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#00bfff'},
  rowSection: {height: 60, backgroundColor: '#cbe314'},
  head: {height: 44, backgroundColor: '#00bfff'},
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  text: {margin: 6, fontSize: 16, fontWeight: 'bold', textAlign: 'center',color:'black'},
});