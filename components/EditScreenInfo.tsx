import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
``
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const AuthContext = React.createContext(undefined);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView>
      <View>
        <View style={styles.getStartedContainer}>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Please login below.
          </Text>

          {/* <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            darkColor="rgba(255,255,255,0.05)"
            lightColor="rgba(0,0,0,0.05)"
          >
            <MonoText>{path}</MonoText>
          </View> */}

          <Input
            style={styles.getStartedText}
            textContentType="username"
            placeholder="Username"
            leftIcon={<Icon name="user" size={22} color="black" />}
            value={username}
            onChangeText={setUsername}
          />

          <Input
            style={styles.getStartedText}
            placeholder="Password"
            secureTextEntry={true}
            blurOnSubmit={true}
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
          <View>
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'left',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
