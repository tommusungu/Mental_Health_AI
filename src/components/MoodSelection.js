// MoodSelection.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const MoodSelection = ({
  theme,
  moods,
  selectedMood,
  setSelectedMood,
  note,
  setNote,
  handleMoodSubmit,
}) => {
  return (
    <View className="p-3 mt-2">
      <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-xl font-semibold mb-2`}>
        How are you feeling today?
      </Text>

      <View className="flex-row flex-wrap">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            className={`flex-grow p-3 m-1 rounded-lg 
              ${selectedMood === mood.value ? 'bg-[#ea580c]' : theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100 border border-gray-200'}`}
            
            onPress={() => setSelectedMood(mood.value)}
            style={{ minWidth: '25%' }} // Ensures buttons have a minimum width
          >
            <Text className={`${selectedMood === mood.value ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-black'} text-center`}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Optional Note Section */}
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Add a note (optional)"
        placeholderTextColor="#808080"
        className={`${theme === 'dark' ? 'bg-[#202020] text-white' : 'bg-gray-100 border border-gray-200 text-black'} w-full mt-4 p-3 rounded-lg`}
      />

      {/* Submit Button */}
      <TouchableRipple
        rippleColor={'#202020'}
        onPress={handleMoodSubmit}
        className="mt-4 p-3 py-4 bg-[#ea580c] rounded-lg"
      >
        <View>
          <Text className={`${theme === 'dark' ? 'text-white' : 'text-white'} text-center text-lg font-medium `}>
            Log Mood
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default MoodSelection;
