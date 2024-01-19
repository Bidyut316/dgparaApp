import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, ScrollView, Text,TouchableOpacity} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {MatchdataContext} from '../services/auth/matchdata';
import Ionicons from 'react-native-vector-icons/Ionicons';



// function formatData(fetchedData) {
//   const uniqueNamesCount = {};
//   Object.values(fetchedData).forEach((item) => {
//     item.lose.forEach((name) => {
//       const trimmedName = name.trim();
//       uniqueNamesCount[trimmedName] =
//         uniqueNamesCount[trimmedName] || {
//           winCount: 0,
//           loseCount: 0,
//         };
//       uniqueNamesCount[trimmedName].loseCount++;
//     });
//     item.wine.forEach((name) => {
//       const trimmedName = name.trim();
//       uniqueNamesCount[trimmedName] =
//         uniqueNamesCount[trimmedName] || {
//           winCount: 0,
//           loseCount: 0,
//         };
//       uniqueNamesCount[trimmedName].winCount++;
//     });
//   });

//   const formattedData = Object.entries(uniqueNamesCount).map(
//     ([name, { winCount, loseCount }], index) => {
//       return [`${index + 1}`, name, winCount.toString(), loseCount.toString()];
//     }
//   );

//   return formattedData;
// }

// Usage:
// const fetchedData = {
//   // Your fetched data object
// };

// const formattedData = formatData(fetchedData);
// console.log('formattedData: ', formattedData);
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
  const tableDataSample = {
    tableHead: ['Si.No', 'Name', 'Win', 'Lose'],
    widthArr: [55, 196, 70, 70],
    tableData: [
      ['1', 'Bidyut Mandal', '20', '11'],
      ['2', 'Sourav Ghosh', '305', '90'],
      ['3', 'Pritam Bhattacharjee', '55', '23'],
      ['4', 'xxxx kumar Mandal', '21', '88'],
    ],
  };
  const [data, setData] = useState(tableDataSample);
  const [fdata, setFdata] = useState([]);
  const {matchdata} = useContext(MatchdataContext);
  const [sortOrder, setSortOrder] = useState(null);
  const sortData = (sortBy) => {
    const sortedData = [...fdata].sort((a, b) => {
      let index = sortBy === 'Win' ? 2 : 3;
      return parseInt(b[index], 10) - parseInt(a[index], 10);
    });
   // Add back the serial numbers
   const sortedDataWithSerial = sortedData.map((rowData, index) => {
    return [`${index + 1}`, ...rowData.slice(1)]; // Assuming the serial number is in the first position
  });
  console.log(sortedDataWithSerial);
    // setData({ ...data, tableData: sortedData });
    setData({
      tableHead: ['Si.No', 'Name',
      <SortableHeader text="Win" sortData={sortData} />
    ,
    <SortableHeader text="Lose" sortData={sortData} />
     
    ],
      widthArr: [55, 196, 70, 70],
      tableData:sortedDataWithSerial ,
    })
    setSortOrder(sortBy);
  };
const formatData=(data2)=>{
  // console.log("Vidyut",data2);
  if (!data2) {
    return <Text>Loading...</Text>; // Return a loading message if data2 is null
  }
  const uniqueNamesCount = {};
        Object.values(data2).forEach(item => {
          item.lose.forEach(name => {
            const trimmedName = name.trim();
            uniqueNamesCount[trimmedName] = uniqueNamesCount[trimmedName] || {
              winCount: 0,
              loseCount: 0,
            };
            uniqueNamesCount[trimmedName].loseCount++;
          });
          item.wine.forEach(name => {
            const trimmedName = name.trim();
            uniqueNamesCount[trimmedName] = uniqueNamesCount[trimmedName] || {
              winCount: 0,
              loseCount: 0,
            };
            uniqueNamesCount[trimmedName].winCount++;
          });
        });
        // console.log('uniqueNamesCount:   ==========>', uniqueNamesCount);
        const formattedData = Object.entries(uniqueNamesCount).map(
          ([name, {winCount, loseCount}], index) => {
            return [
              `${index + 1}`,
              name,
              winCount.toString(),
              loseCount.toString(),
            ];
          },
        );
        // console.log('formattedData22222>>>>>>>>>> ', formattedData);
        setFdata(formattedData)
        setData({
          tableHead: ['Si.No', 'Name',
          <SortableHeader text="Win" sortData={sortData} />,
          <SortableHeader text="Lose" sortData={sortData} />
        ],
          widthArr: [55, 196, 70, 70],
          tableData:formattedData ,
        })
        return formattedData;
        //
}

  useEffect(() => {
    formatData(matchdata);
  }, [matchdata]); // Empty dependency array ensures it only runs once

  if (!matchdata) {
    // Data is not yet availablse, you can show a loading state or handle accordingly
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'purple'}}>
            <Row
              data={data.tableHead}
              widthArr={data.widthArr}
              style={styles.head}
              textStyle={styles.headText}
            />
            
          </Table>
          <ScrollView>
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
// export default TableThree
