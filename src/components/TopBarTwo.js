import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../themeContext';
const TopBarTwo = ({title, navigationTo}) => {
    const navigation = useNavigation()
    const { theme } = useTheme();

  return (
    <View className='flex justify-between items-center'>
        <TouchableOpacity className='absolute left-1' onPress={()=> navigation.goBack()} >
        <Ionicons  color={`${theme === 'dark' ? '#e5e7eb' : '#202020'}`} name='arrow-back-outline' size={28} />

        </TouchableOpacity>
        
      <Text className={`${theme === 'dark' ? 'text-gray-200' : 'text-[#202020]'} text-xl font-semibold`}>{title}</Text>
    </View>
  )
}

export default TopBarTwo