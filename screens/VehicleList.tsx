import * as React from 'react';
import { StyleSheet } from 'react-native';

import VirtualizedList from '../components/VirtualizedList';
import { Text, View } from '../components/Themed';

export default function VehicleList() {
  // render vehicle list for user once logged in
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Vehicle List:</Text>
      <VirtualizedList></VirtualizedList>
      <Text style={styles.text}>Signed in successfully 🎉</Text>
      <Text style={styles.text}>Try using the navigation bar on the left to move around the app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    textAlign: 'center',
    margin: 8,
  },
  header: {
    textAlign: 'left',
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  }
});
