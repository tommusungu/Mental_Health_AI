import { View, Text, TouchableOpacity, Vibration } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTab, setCurrentTab } from '../slices/navSlice';
import { useTheme } from '../../themeContext';

const HomeTabs = ({tabs}) => {
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const activeTab = useSelector(selectCurrentTab);
  return (
    <View className='w-full px-2 mb-2'>
       
<FlatList
      data={tabs}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
           onPress={()=>{
            dispatch(
              setCurrentTab({
                id: item.id,
                title: item.title,
              })
            );
            // Vibration.vibrate(77);
           }} 
           key={item.id}
           className='rounded-full p-2 flex justify-center items-center'
           >
            <View className={` w-12 h-12 rounded-full justify-center items-center ${item.title===activeTab?.title ? 'bg-orange-600' : 'bg-[#303030]'}`}>
                <Ionicons 
                name={item.icon}
                size={24}
                color={'#e5e7eb'}
                />
            </View>
            <Text className={`text-xs mt-2 text-center w-20 
            ${item.title===activeTab?.title ? 'text-orange-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            `}>{item.title}</Text>
            </TouchableOpacity>
      )}
    />
    </View>
  )
}

export default HomeTabs