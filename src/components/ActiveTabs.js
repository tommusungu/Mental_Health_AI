import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'; // Import Linking
import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../slices/navSlice';
import { useTheme } from '../../themeContext';

const ActiveTabs = () => {
  const currentTab = useSelector(selectCurrentTab);
  const {theme} = useTheme();
  // Example data resources for each tab
  const resources = {
    'Mood Tracker': [
      {
        title: "Understanding Your Emotions",
        description: "Track and understand the patterns in your mood.",
        link: "https://kidshealth.org/en/teens/understand-emotions.html",
      },
      {
        title: "Daily Mood Journal",
        description: "Log your feelings and see your progress.",
        link: "https://www.verywellmind.com/how-to-start-a-mood-journal-5205378",
      },
    ],
    'Meditation': [
      {
        title: "Guided Meditation for Relaxation",
        description: "A calming guide to reduce stress and anxiety.",
        link: "https://www.headspace.com/meditation/meditation-for-anxiety",
      },
      {
        title: "Mindfulness Basics",
        description: "Learn the basics of mindfulness and its benefits.",
        link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      },
    ],
    'Relationships': [
      {
        title: "Building Healthy Relationships",
        description: "Tips on maintaining strong relationships.",
        link: "https://kidshealth.org/en/teens/friendships.html",
      },
      {
        title: "Conflict Resolution Strategies",
        description: "Learn how to manage conflicts effectively.",
        link: "https://www.helpguide.org/articles/relationships-communication/conflict-resolution-skills.htm",
      },
    ],
    'Students': [
      {
        title: "Student Mental Health Support",
        description: "Resources for managing academic stress.",
        link: "https://www.mhanational.org/back-school",
      },
      {
        title: "Time Management for Students",
        description: "Improve productivity with these tips.",
        link: "https://www.topuniversities.com/blog/top-time-management-tips-students",
      },
    ],
  };
  

  // Combine all resources into a single array for fallback
  const allResources = Object.values(resources).flat();

  const activeResources = resources[currentTab?.title] || allResources; // Show all resources if none found for current tab

  return (
    <ScrollView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} p-3 pb-0 `}>
      <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold mb-4`}>{currentTab?.title || 'Resources'}</Text>
      
      {activeResources.length > 0 ? (
        activeResources.map((resource, index) => (
          <View key={index} className={`${theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-50 border border-gray-100'} mb-3 p-4 px-3  rounded-lg`}>
            <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{resource.title}</Text>
            <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{resource.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(resource.link)}>
              <Text className="text-[#ea580c]">Learn More</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} `}>No resources available for this topic.</Text>
      )}
    </ScrollView>
  );
};

export default ActiveTabs;
