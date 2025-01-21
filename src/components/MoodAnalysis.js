// MoodAnalysis.js
import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTheme } from '../../themeContext';

const screenWidth = Dimensions.get('window').width;

const MoodAnalysis = ({ moods, moodLog, home }) => {
  const {theme} = useTheme();
  const moodFrequencyData = moods.map(
    (mood) => moodLog.filter((log) => log.mood === mood.value).length
  );

  return (
    <View className="p-3 pt-0 w-full justify-center items-center">
      {home === false && (
        <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} w-full text-start  text-xl font-semibold mb-2 pt-3`}>
          Mood Analysis
        </Text>
      )}
      <LineChart
        data={{
          labels: moods.map((mood) => mood.label.split(' ')[1]), // Use mood labels
          datasets: [{ data: moodFrequencyData }],
        }}
        width={screenWidth - 20} // Adjust for padding
        height={220}
        chartConfig={{
  backgroundColor: theme === 'dark' ? '#101010' : '#f9fafb', // Dark and light background
  backgroundGradientFrom: theme === 'dark' ? '#1f1f1f' : '#f9fafb', // Adjust gradient start color
  backgroundGradientTo: theme === 'dark' ? '#1f1f1f' : '#f9fafb', // Adjust gradient end color
    color: (opacity = 1) =>
    theme === 'dark'
      ? `rgba(255, 165, 0, ${opacity})` // Orange color for dark theme
      : `rgba(255, 165, 0, ${opacity})`, // Dark gray color for light theme
      labelColor: (opacity = 1) =>
        theme === 'dark'
          ? `rgba(255, 255, 255, ${opacity})` 
          : `rgba(0, 0, 0, ${opacity})`, 
  style: {
    borderRadius: 4,
  },
  propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },

}}

        bezier
        style={{ borderRadius: '8px' }}
      />
    </View>
  );
};

export default MoodAnalysis;
