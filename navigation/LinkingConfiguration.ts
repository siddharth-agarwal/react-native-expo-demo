import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          // TabOne: {
          LoggedIn: {
            screens: {
              VehicleListScren: 'one',
            },
          }
        },
      },
      NotFound: '*',
    },
  },
};
