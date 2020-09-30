import * as React from 'react';
import { StyleSheet } from 'react-native';

import VirtualizedList from '../components/VirtualizedList';
import { Text, View } from '../components/Themed';

export default function VehicleList() {
  // render vehicle list for user once logged in
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signed in successfully 🎉</Text>

      <VirtualizedList></VirtualizedList>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
