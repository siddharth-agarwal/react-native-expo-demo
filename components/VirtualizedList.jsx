import React from 'react';
import { SafeAreaView, VirtualizedList, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

// TODO: add field linking `user_key` to vehicle `key` field
// note: this is a temp JSON for debugging purposes
const DATA= [
  {
    key: '1',
    vehicle: '2016 Audi A4'
  },
  {
    key: '2',
    vehicle: '2019 BMW 325i'
  },
  {
    key: '3',
    vehicle: '2017 VW GTI'
  }
];

const RenderVehicleList = () => {
  const { data: vehicles } = useGet({
    path: "/api/vehicles/",
    base,
  });
  return (
    <div>
      <h1>vehicles</h1>
      <ul>
        {vehicles &&
          vehicles.map(vehicle => (
            <ListItem key={vehicle.id} id={vehicle.id}>
              {vehicle.title}
            </ListItem>
          ))}
      </ul>
    </div>
  );
};

const getItem = (data, index) => {
  return {
    key: DATA[index].key,
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
        renderItem={({ item }) => <Item title={item.key} subheader={item.vehicle} />}
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
    marginTop: 10
  },
  item: {
    backgroundColor: '#c9e3cd',
    height: 80,
    justifyContent: 'center',
    marginVertical: 5,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default VirtualizedListExample;
