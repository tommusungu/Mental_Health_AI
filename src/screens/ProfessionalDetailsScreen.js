import React from 'react';
import { View, Text, Image, StatusBar, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
import { selectProfessional } from '../slices/navSlice';
import TopBarTwo from '../components/TopBarTwo';
import { useTheme } from '../../themeContext';
import { Ionicons } from '@expo/vector-icons';

const ProfessionalDetailsScreen = () => {
  const professional = useSelector(selectProfessional); // Get selected professional's data
  const { theme } = useTheme();

  // Check if professional exists
  const item = professional?.item;
  console.log('item is ',item)
  if (!item) {
    return (
      <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 justify-center items-center`}>
        <StatusBar
          barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
          backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`}
        />
        <Text className="text-gray-500 text-lg">Professional not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1`}>
      <StatusBar
        barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
        backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`}
      />
      <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full p-3 pt-6 pb-4`}>
        <TopBarTwo title="Professional Details" />
      </View>
      <View className={`${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100 border border-gray-200'} rounded-lg p-4 m-3`}>
        <View className="items-center mb-4">
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              className="w-24 h-24 rounded-full mb-2"
              resizeMode="cover"
            />
          ) : (
            <View
              className={`${
                theme === 'dark' ? 'bg-[#303030]' : 'bg-white'
              } w-24 h-24 rounded-full justify-center items-center mb-2`}
            >
              <Ionicons
                name="person-outline"
                size={32}
                color={`${theme === 'dark' ? '#e5e7eb' : '#202020'}`}
              />
            </View>
          )}
          <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-xl font-semibold`}>
            {item.firstName} {item.lastName}
          </Text>
          <Text className="text-orange-600 text-base">
            {item.profession || 'Professional'}
          </Text>
        </View>
        <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center text-sm mb-4`}>
          {item.description}
        </Text>
        
        <TouchableRipple
          onPress={() => console.log('Contacting', item.firstName)}
          className="bg-orange-600 p-3 rounded-lg mt-4"
          rippleColor="#FF8C42"
        >
          <Text className="text-white text-center text-lg">Contact</Text>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfessionalDetailsScreen;
