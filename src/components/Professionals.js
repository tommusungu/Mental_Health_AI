import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setProfessional } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../themeContext';
import apiRequest from '../utils/api';
import { Ionicons } from '@expo/vector-icons';
const Professionals = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch professionals from the backend
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await apiRequest.get('/professional/getProfessionals');
        setProfessionals(response.data); // Assuming response.data is an array
        setLoading(false);
      } catch (err) {
        console.error('Error fetching professionals:', err);
        setError('Failed to load professionals. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const renderProfessional = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        dispatch(
          setProfessional({item})
        );
        navigation.navigate('ProfessionalDetails');
      }}
      className={`${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-50 border border-gray-100'} rounded-lg overflow-hidden mr-3 p-3 w-48`}
      rippleColor="#999999"
    >
      <View className="items-center">
        {item?.imageUrl ? 
        (
          <Image
          source={{ uri: item?.imageUrl }}
          className="w-20 h-20 rounded-full mb-2"
        />
        ) : 
        (
          <View
                className={`${
                  theme === 'dark' ? 'bg-[#303030] ' : 'bg-gray-100'
                } w-20 h-20 rounded-full justify-center items-center mb-2`}
              >
                <Ionicons
                  name="person-outline"
                  size={32}
                  color={`${theme === 'dark' ? '#e5e7eb' : '#202020'}`}
                />
              </View>
        )}
        
        
        <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-orange-600 text-sm">{item?.profession || 'Professional'} </Text>
        <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center text-sm mt-1`}>
  {item.description.split(" ").length > 10
    ? `${item.description.split(" ").slice(0, 10).join(" ")}...`
    : item.description}
</Text>

      </View>
    </TouchableRipple>
  );

  return (
    <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 p-3`}>
      <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-semibold mb-4`}>
        Our Professionals
      </Text>

      {loading ? (
        <ActivityIndicator size={28} color="#999999" />
      ) : error ? (
        <Text className="text-red-500 text-center text-lg">{error}</Text>
      ) : professionals.length > 0 ? (
        <FlatList
          data={professionals}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderProfessional}
          keyExtractor={(item) => item.userId}
        />
      ) : (
        <Text className="text-gray-400 text-center text-lg mt-5">
          No professionals available.
        </Text>
      )}
    </View>
  );
};

export default Professionals;
