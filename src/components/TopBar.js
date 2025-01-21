import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setQuestion } from '../slices/navSlice';
import { useTheme } from '../../themeContext';

const TopBar = () => {
  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View className="w-full flex-row justify-between items-center mb-2">
      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        className="flex-row justify-start gap-2 items-center"
      >
        {user && user?.profilePicture ? (
          <Image
            resizeMode="cover"
            source={{ uri: user?.profilePicture }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View
            className={`${
              theme === 'dark' ? 'bg-[#303030]' : 'bg-[#303030]'
            } w-12 h-12 rounded-full justify-center items-center`}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={`${theme === 'dark' ? '#e5e7eb' : '#e5e7eb'}`}
            />
          </View>
        )}

        <View>
          <Text
            className={`${
              theme === 'dark' ? 'text-gray-100' : 'text-black'
            } text-xl font-semibold`}
          >
            Hello,
          </Text>
          <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          
          navigation.navigate('Notifications');
        }}
      >
        <Ionicons
          name="notifications-outline"
          color={theme === 'dark' ? '#ffffff' : '#101010'}
          size={28}
        />
      </TouchableOpacity>

     
    </View>
  );
};

export default TopBar;
