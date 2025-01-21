import './global.css';
// App.js
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatsScreen from './src/screens/ChatsScreen';
import AccountScreen from './src/screens/AccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MoodScreen from './src/screens/MoodScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import ChatScreen from './src/screens/ChatScreen';
import { selectUser, setUser } from './src/slices/navSlice';
import useUserFetch from './src/hooks/useUserFetch';
import { useEffect } from 'react';
import GroupChatScreen from './src/screens/GroupChatScreen';
import ProfessionalChatScreen from './src/screens/ProfessionalChatScreen';
import ProfessionalScreen from './src/screens/ProfessionalScreen';
import ProfessionalDetailsScreen from './src/screens/ProfessionalDetailsScreen';
import { ThemeProvider, useTheme } from './themeContext';
import ChatScreenTwo from './src/screens/ChatScreenTwo';
import { ToastProvider } from 'react-native-toast-notifications';
import NotificationsScreen from './src/screens/NotificationsScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const { fetchedUser, loading, error } = useUserFetch(user);

  // useEffect(() => {
  //   if (fetchedUser) {
  //     dispatch(
  //       setUser({
  //         ...user,
  //         firstName: fetchedUser.firstName,
  //         lastName: fetchedUser.lastName,
  //       })
  //     );
  //   }
  // }, [fetchedUser, dispatch]);
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#ea580c',
        tabBarInactiveTintColor: theme === 'dark' ? '#9ca3af' : '#202020', // gray-500
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Mood') {
            iconName = focused ? 'happy' : 'happy-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;

          if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'Chats') {
            label = 'Chats';
          } else if (route.name === 'Mood') {
            label = 'Mood';
          } else if (route.name === 'Account') {
            label = 'Account';
          }

          return (
            <Text style={{ color, fontWeight: focused ? '700' : 'normal' }}>
              {label}
            </Text>
          );
        },
        tabBarStyle: {
          height: 67, // Optional custom height
          paddingBottom: 15,
          borderTopColor: theme === 'dark' ? '#606060' : '#eeeeee',
          backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Chats"
        component={ChatsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Mood"
        component={MoodScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <ToastProvider>
              {/* {' '} */}
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator
                  initialRouteName="LoginStack"
                  screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                    transitionSpec: {
                      open: { animation: 'timing', config: { duration: 500 } },
                      close: { animation: 'timing', config: { duration: 500 } },
                    },
                  }}
                >
                  <Stack.Screen
                    name="Onboarding"
                    component={OnBoardingScreen}
                  />
                  <Stack.Screen name="LoginStack" component={LoginStack} />
                  <Stack.Screen name="GroupChat" component={GroupChatScreen} />
                  <Stack.Screen
                    name="ProfessionalChat"
                    component={ProfessionalChatScreen}
                  />
                  <Stack.Screen
                    name="Professional"
                    component={ProfessionalScreen}
                  />
                  <Stack.Screen
                    name="ProfessionalDetails"
                    component={ProfessionalDetailsScreen}
                  />
                  <Stack.Screen name="Chat" component={ChatScreen} />
                  <Stack.Screen name="ChatTwo" component={ChatScreenTwo} />
                  <Stack.Screen name="Main" component={MainTabs} />
                  <Stack.Screen name="Notifications" component={NotificationsScreen} />
                </Stack.Navigator>
              </GestureHandlerRootView>
            </ToastProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
