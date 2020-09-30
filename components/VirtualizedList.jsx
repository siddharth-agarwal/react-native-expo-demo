import React from 'react';
import { SafeAreaView, VirtualizedList, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

// TODO: add field linking `user_id` to vehicle `id` field
// note: this is a temp JSON for debugging purposes
const DATA= [
  {
    id: 1,
    vehicle: '2016 Audi A4'
  },
  {
    id: 2,
    vehicle: '2019 BMW 325i'
  },
  {
    id: 3,
    vehicle: '2017 VW GTI'
  }
];

const getItem = (data, index) => {
  return {
    id: DATA[index].id,
    name: DATA[index].name,
    vehicle: DATA[index].vehicle
  }
}

const getItemCount = (data) => {
  return DATA.length;
}

const Item = ({ title, subheader })=> {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>car{title}</Text>
      <Text style={styles.vehicle}>{subheader}</Text>
    </View>
  );
}
``
const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.id} subheader={item.vehicle} />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#c9e3cd',
    height: 80,
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default VirtualizedListExample;
