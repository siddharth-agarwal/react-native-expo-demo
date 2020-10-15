import React from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";

import {
  useTheme,
  ParamListBase,
} from "@react-navigation/native";

import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from '@react-navigation/stack';

import { Button } from 'react-native-elements';

import axios from 'axios';
import { MonoText } from '../components/StyledText';
import UserProfile from '../screens/UserProfile';

type AuthStackParams = {
  Splash: undefined;
  LoggedInScreen: undefined;
  SignIn: undefined;
  PostSignOut: undefined;
};

const AUTH_CONTEXT_ERROR =
  'Authentication context not found. Have your wrapped your components with AuthContext.Consumer?';

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
}>({
  signIn: () => {
    throw new Error(AUTH_CONTEXT_ERROR);
  },
  signOut: () => {
    throw new Error(AUTH_CONTEXT_ERROR);
  },
});

const SplashScreen = () => {
  return (
    <View style={styles.content}>
      <Image source={require('../assets/images/icon.png')}></Image>
      <ActivityIndicator />
    </View>
  );
};

const SignInScreen = () => {
  const [username, setUsername] = React.useState('jain.piyush888@gmail.com');
  const [password, setPassword] = React.useState('1234');
  const [token, setToken] = React.useState('xyz');

  const { colors } = useTheme();

  const authServer = () => {
    let token = '';
    const base = "https://geotoll-api.azurewebsites.net";
    axios.post(base + '/api/user/login', {'email': username, 'password': password}).then((res) => {
      let _token = res.data.token;
      if (_token)
        setToken(_token);
    }).catch(e => {
      console.log('error authenticating with remote server: ', e);
    });

    return token;
  }

  return (
    <View style={styles.content}>
      <TokenContext.Provider
        value={{ username: username, password: password, token: token }}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/icon.png")}
        />
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          autoCapitalize="none"
          value={username}
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
        />
        <Button
          title="Sign In"
          onPress={() => setToken(authServer())}
          style={styles.button}
        >
          Sign in
        </Button>
        <MonoText>{token}</MonoText>
      </TokenContext.Provider>
    </View>
  );
};

const SimpleStack = createStackNavigator<AuthStackParams>();

type State = {
  isLoading: boolean;
  isSignout: boolean;
  token: undefined | string;
};

type Action =
  | { type: 'RESTORE_TOKEN'; token: undefined | string }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

  const LoginVars = {
    username: '',
    password: '',
    token: ''
  };

const TokenContext = React.createContext(LoginVars);

export default function SimpleStackScreen({navigation,}: StackScreenProps<ParamListBase>) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>((prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: undefined,
    }
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'RESTORE_TOKEN', token: undefined });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const authContext = React.useMemo(
    () => ({
      signIn: () => dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' }),
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: any) => {
        // TODO
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
        <TokenContext.Consumer>
          {token => (
            <SimpleStack.Navigator
              screenOptions={{
                headerLeft: () => (
                  <HeaderBackButton onPress={() => navigation.goBack()} />
                ),
              }}
            >
              {state.token === undefined ? (
                  <SimpleStack.Screen
                  name="SignIn"
                  options={{
                    title: 'Sign in',
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                  component={SignInScreen}
                  />
                  ): (
                  <SimpleStack.Screen
                    name="LoggedInScreen"
                    component={UserProfile}
                  />
                  )}
            </SimpleStack.Navigator>
          )}
        </TokenContext.Consumer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  input: {
    width: 250,
    margin: 8,
    padding: 10,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  button: {
    margin: 8,
  },
  text: {
    textAlign: 'center',
    margin: 8,
  },
  logo: {
    width: 240,
    height: 240,
  },
  profile: {
    flex: 1,
    // alignItems: 'center',
    padding: 10
  }
});