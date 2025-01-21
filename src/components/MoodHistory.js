import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MoodHistory = ({ theme,moodLog, moods, onDeleteMood }) => {
  const confirmDelete = (logId) => {
    Alert.alert(
      'Delete Mood',
      'Are you sure you want to delete this mood entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => onDeleteMood(logId),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View className="p-3 w-full justify-center items-center">
      <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} w-full text-start  text-xl font-semibold mb-2`}>
        Mood History
      </Text>
      {moodLog?.length > 0 ? (
        moodLog.map((log, index) => (
          <View key={index} className={`${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100 border border-gray-200'} p-3 w-full mb-2 flex-row justify-between items-center rounded-lg`}>
            <View className='w-3/4'>
            <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {moods.find((m) => m.value === log.mood)?.label || log.mood}
            </Text>
            {log.note && <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{log.note}</Text>}
            <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}  text-xs mt-1`}>
              {new Date(log.timestamp).toLocaleDateString()} -{' '}
              {new Date(log.timestamp).toLocaleTimeString()}
            </Text>
            </View>

            <TouchableOpacity
              onPress={() => confirmDelete(log._id)}
              className="mt-2 w-8 h-8 flex justify-center items-center bg-red-600 p-1 rounded-full"
            >
              <Ionicons 
                name='trash-outline'
                size={16}
                color={'#e5e7eb'}
                />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-gray-400">
          No mood logs yet. Start tracking your mood today!
        </Text>
      )}
    </View>
  );
};

export default MoodHistory;
