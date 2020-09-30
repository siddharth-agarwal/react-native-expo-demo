import * as React from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
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

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import Button from 'react-native-button';

import VehicleList from '../screens/VehicleList';

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
  const { signIn } = React.useContext(AuthContext);
  const { colors } = useTheme();

  return (
    <View style={styles.content}>
      <Image
        style={styles.logo}
        source={require('../assets/images/icon.png')}
      />
      <TextInput
        placeholder="Username"
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
      />
      <Button mode="contained" onPress={signIn} style={styles.button}>
        Sign in
      </Button>
    </View>
  );
};

const UserProfile = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.content}>
      <Text style={styles.profile}>
        Welcome to your user profile.
      </Text>
      <Text style={styles.profile}>
        This screen will display details which pertain to the user who is currently logged in.
      </Text>
      <Button mode="contained" onPress={signOut} style={styles.button}>
        Sign Out
      </Button>
    </View>
  )
}

const NavDrawer = createDrawerNavigator();

const UserLoggedInScreen = () => {
  return (
    <NavDrawer.Navigator>
      <NavDrawer.Screen
        name="VehicleList"
        component={VehicleList}
        options={{ title: 'Vehicle List' }}
      />
      <NavDrawer.Screen name="User Profile" component={UserProfile}/>
  </NavDrawer.Navigator>
  );
};

const SimpleStack = createStackNavigator<AuthStackParams>();

type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: undefined | string;
};

type Action =
  | { type: 'RESTORE_TOKEN'; token: undefined | string }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

export default function SimpleStackScreen({
  navigation,
}: StackScreenProps<ParamListBase>) {

  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: undefined,
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
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <SimpleStack.Navigator
        screenOptions={{
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        }}
      >
        {state.userToken === undefined ? (
          <SimpleStack.Screen
            name="SignIn"
            options={{
              title: 'Sign in',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
            component={SignInScreen}
          />
        ) : (
          <SimpleStack.Screen
            name="UserLoggedInScreen"
            options={{ title: 'UserLoggedInScreen' }}
            component={UserLoggedInScreen}
          />
        )}
      </SimpleStack.Navigator>
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