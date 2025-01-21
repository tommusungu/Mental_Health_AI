import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import TopBarTwo from '../components/TopBarTwo';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import icons for styling options
import { TouchableRipple } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../slices/navSlice'; // Ensure clearUser is defined in your slice
import { auth } from '../config/firebaseConfig'; // Import Firebase auth
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { signOut } from 'firebase/auth'; // Import signOut from Firebase

import { useTheme } from '../../themeContext';
import { Button } from 'react-native';
import ProfilePictureUpdater from '../components/ProfilePictureUpdater';

const AccountScreen = () => {
  const navigation = useNavigation();
 
  const user = useSelector(selectUser);
  const { theme, toggleTheme } = useTheme();

  // Handle logout function
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');

      navigation.replace('LoginStack');
      // navigation.replace('LoginStack'); // Adjust the name to match your login screen
    } catch (error) {
      console.error('Logout error:', error);
    }
  };



  return (
    <SafeAreaView
      className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}
    >
      <StatusBar
        barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
        backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`}
      />

      <View className="w-full p-3 pt-6">
        <TopBarTwo title="Account" />
      </View>

      <ScrollView
        className={`${
          theme === 'dark' ? 'bg-[#101010]' : 'bg-white'
        } py-3 w-full`}
      >
        {/* Account Information Section */}
        <View
          className={`${
            theme === 'dark'
              ? 'bg-[#202020]'
              : 'bg-gray-50 border border-gray-100'
          } p-4 rounded-lg m-3`}
        >
          <View className="justify-center items-center">
           
            {user?.profilePicture ? (
              <View className='relative'>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: user.profilePicture || 'defaultProfilePicUri',
                  }}
                  className='w-32 h-32 rounded-full justify-center items-center'
                />
                 <View className='absolute right-0'>
                  <ProfilePictureUpdater theme={theme}/>
                </View>
                </View>
            ) : (
              <View className='relative'>
              <View
                className={`${
                  theme === 'dark' ? 'bg-[#303030] ' : 'bg-gray-100'
                } w-32 h-32 rounded-full justify-center items-center`}
              >
                <Ionicons
                  name="person-outline"
                  size={40}
                  color={`${theme === 'dark' ? '#e5e7eb' : '#202020'}`}
                />
              </View>
              <View className='absolute right-0'>
              <ProfilePictureUpdater theme={theme}/>
            </View>
            </View>

            )}
            <Text
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-black'
              } text-xl mt-1`}
            >
              {user?.firstName} {user?.lastName}
            </Text>
            <Text
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-black'
              } `}
            >
              {user?.email}
            </Text>
          </View>
        </View>

       {/* More Section */}
        <View className="p-3">
          <Text
            className={`${
              theme === 'dark' ? 'text-white' : 'text-black'
            } text-lg font-semibold mb-2`}
          >
            More
          </Text>

         

          {[
            {
              title: 'Become a Professional',
              icon: 'person-outline',
              screen: 'Professional',
            },
            {
              title: 'Notifications',
              icon: 'notifications-outline',
              screen: 'Notifications',
            },
            // { title: 'Notifications', icon: 'notifications-outline', screen: 'Account' },
            // { title: 'Language', icon: 'globe-outline', screen: 'Account' },
          ].map((item, index) => (
            <TouchableRipple
              key={index}
              className={`${
                theme === 'dark'
                  ? 'bg-[#202020]'
                  : 'bg-gray-50 border border-gray-100'
              } p-4 rounded-lg my-1`}
              onPress={() => navigation.navigate(item.screen)}
              rippleColor={'#999999'}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name={item.icon} size={24} color="#ea580c" />
                  <Text
                    className={`${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    } text-lg ml-3`}
                  >
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#ea580c"
                />
              </View>
            </TouchableRipple>
          ))}
        </View>

        {/* Settings Section */}
        <View className="p-3">
          <Text
            className={`${
              theme === 'dark' ? 'text-white' : 'text-black'
            } text-lg font-semibold mb-2`}
          >
            Settings
          </Text>

          <TouchableRipple
            className={`${
              theme === 'dark'
                ? 'bg-[#202020]'
                : 'bg-gray-50 border border-gray-100'
            } p-4 rounded-lg my-1`}
            onPress={toggleTheme}
            rippleColor={'#999999'}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons
                  name={`${
                    theme === 'dark' ? 'sunny-outline' : 'moon-outline'
                  }`}
                  size={24}
                  color="#ea580c"
                />
                <Text
                  className={`${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  } text-lg ml-3`}
                >
                  {theme === 'dark' ? <>Light Mode</> : <>Dark Mode</>}
                </Text>
              </View>
              
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#ea580c"
              />
            </View>
          </TouchableRipple>


          {[
            {
              title: 'Privacy & Security',
              icon: 'lock-closed-outline',
              screen: 'Account',
            },
            
            { title: 'Language', icon: 'globe-outline', screen: 'Account' },
          ].map((item, index) => (
            <TouchableRipple
              key={index}
              className={`${
                theme === 'dark'
                  ? 'bg-[#202020]'
                  : 'bg-gray-50 border border-gray-100'
              } p-4 rounded-lg my-1`}
              onPress={() => navigation.navigate(item.screen)}
              rippleColor={'#999999'}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name={item.icon} size={24} color="#ea580c" />
                  <Text
                    className={`${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    } text-lg ml-3`}
                  >
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#ea580c"
                />
              </View>
            </TouchableRipple>
          ))}
        </View>

        {/* Logout Button */}
        <View className="p-3 mb-3">
          <TouchableRipple
            className="p-4 bg-[#bf0a30] rounded-lg flex-row justify-center items-center"
            onPress={handleLogout} // Call handleLogout on press
            rippleColor={'#999999'}
          >
            <View className="flex-row justify-center items-center">
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text className="text-white text-lg ml-2">Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
