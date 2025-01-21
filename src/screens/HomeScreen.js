import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import HomeQuestions from '../components/HomeQuestions';
import HomeTabs from '../components/HomeTabs';
import MoodAnalysis from '../components/MoodAnalysis';
import { moods, questions, tabs } from '../hooks/Database';
import ActiveTabs from '../components/ActiveTabs';
import { selectUser } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '../utils/api';
import {
  fetchUserMoods,
  selectLoading,
  selectMoodLog,
} from '../slices/moodSlice';
import Professionals from '../components/Professionals';
import { useTheme } from '../../themeContext';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const moodLog = useSelector(selectMoodLog);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMoods(user.id));
    }
  }, [dispatch, user]);

  return (
    <SafeAreaView
      className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}
    >
      <StatusBar
        barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
        backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`}
      />
      <ScrollView
        className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'}`}
      >
        <View className="py-3 w-full">
          <View className="w-full p-3 pb-0">
            <TopBar />
          </View>
        </View>

        <View className="w-full">
          <HomeTabs tabs={tabs} />
          <ActiveTabs />

          <Professionals />
          {/* Mood Analysis */}
          <MoodAnalysis moods={moods} moodLog={moodLog} home={true} />

          {/* Loading Indicator */}

          {loading && (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>
      </ScrollView>
      <View className="w-fit p-3 absolute  bottom-0 right-0">
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.7}
          className={`${
            theme === 'dark' ? 'bg-white' : 'bg-[#101010]'
          } w-fit rounded-full `}
        >
          <Text
            className={`${
              theme === 'dark' ? 'text-black' : 'text-white'
            } text-lg font-medium p-3 px-7 text-center`}
          >
            Chat With AI
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
