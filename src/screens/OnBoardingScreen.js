import { View, Text, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../themeContext';
import { auth } from '../config/firebaseConfig';
import useUserFetch from '../hooks/useUserFetch';
import { ActivityIndicator } from 'react-native-paper';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const [isUserReady, setIsUserReady] = useState(false);

  const checkAuthState = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      dispatch(
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || '',
          email: currentUser.email,
        })
      );
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'LoginStack' }] });
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (user) {
      setIsUserReady(false); // Reset readiness before checking the fetched user
    }
  }, [user]);

  const { fetchedUser } = useUserFetch(user?.id);

  // Update user details if fetched data is available
  useEffect(() => {
    if (fetchedUser && user && !user.firstName) {
      dispatch(
        setUser({
          ...user,
          firstName: fetchedUser.firstName,
          lastName: fetchedUser.lastName,
          _id: fetchedUser._id,
        })
      );
    }
  }, [fetchedUser, user, dispatch]);

  // Ensure navigation happens once the user is ready (firstName fetched)
  useEffect(() => {
    if (user && user.firstName) {
      setIsUserReady(true); // Mark user as ready
    }
  }, [user]);

  useEffect(() => {
    if (isUserReady) {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  }, [isUserReady, navigation]);

  return (
    <View
      className={`${
        theme === 'dark' ? 'bg-[#101010]' : 'bg-gray-100'
      } flex-1 justify-center items-center`}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#101010' : '#f3f4f6'}
      />
      <Text
        className={`${
          theme === 'dark' ? 'text-gray-200' : 'text-[#202020]'
        } text-4xl font-semibold`}
      >
        MentaCare
      </Text>
      <ActivityIndicator
        size={28}
        color={`${theme === 'dark' ? '#ffffff' : '#202020'}`}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default OnBoardingScreen;
