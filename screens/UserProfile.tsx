import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { Text, FlatList } from "react-native";

const base = "https://geotoll-api.azurewebsites.net";

export default function UserProfile() {

  // TODO
  fetch(base + '/api/vehicles/?available_only=true&', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + usertoken
    },
  }).then((response) => response.json())
  .then((json) => setData(json))
  .then((json) => {
    console.log(json);
  });
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
      />
  </View>
  )
}