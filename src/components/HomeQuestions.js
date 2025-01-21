import { View, Text, Vibration } from 'react-native';
import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setConversationId } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const HomeQuestions = ({ questions }) => {
  // Function to shuffle and select random questions
  const getRandomQuestions = (questions, maxQuestions) => {
    // Shuffle the questions array
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    // Return the first maxQuestions elements
    return shuffled.slice(0, maxQuestions);
  };

  // Get a maximum of 2 random questions
  const randomQuestions = getRandomQuestions(questions, 2);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <View className="w-full justify-center items-center gap-3 mt-3">
      {randomQuestions.map((question) => (
        <TouchableRipple
          className="w-full bg-[#202020] rounded-lg"
          key={question.id}
          rippleColor={'#505050'}
          onPress={() => {
            dispatch(
              setConversationId({
                id: null,
                messageText: question.question,
              })
            );
            Vibration.vibrate(77);

            navigation.navigate('Chat'); // Navigate to the screen
          }}
        >
          <View>
            <View className="w-full p-4 pb-3">
              <Text className="text-gray-200 text-xl font-medium">
                {question.title}
              </Text>
              <Text className="text-gray-400 mt-1">{question.question}</Text>
              <View className="flex-row justify-start mt-3"></View>
            </View>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
};

export default HomeQuestions;
