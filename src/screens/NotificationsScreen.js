import { View, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../themeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import TopBarTwo from '../components/TopBarTwo';
import { TouchableRipple } from 'react-native-paper';

const NotificationsScreen = () => {
  const { theme } = useTheme();
  
  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: 'New AI Insights Available!',
      message: 'MentaCare has generated new insights based on your latest environmental data. Check the dashboard for updates.',
      timestamp: '2024-11-30 12:00 PM',
    },
    {
      id: 2,
      title: 'System Update Completed!',
      message: 'The latest system update for MentaCare has been successfully applied. Enjoy the improved performance and new features.',
      timestamp: '2024-11-29 10:30 AM',
    },
    {
      id: 3,
      title: 'New EHS Audit Template Added!',
      message: 'A new audit template for health and safety compliance has been added to MentaCare. Start your audit today.',
      timestamp: '2024-11-28 08:00 AM',
    },
    {
      id: 4,
      title: 'AI Recommendations Available!',
      message: 'MentaCare has generated new recommendations to improve safety protocols based on recent incident reports.',
      timestamp: '2024-11-27 05:30 PM',
    },
    {
      id: 5,
      title: 'Automated Workflow Triggered!',
      message: 'MentaCare has automatically triggered a new workflow based on real-time data. Check your dashboard for details.',
      timestamp: '2024-11-26 02:15 PM',
    }
  ];

  const [notificationList, setNotificationList] = useState(notifications);

  const handleDeleteNotification = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedNotifications = notificationList.filter(notification => notification.id !== id);
            setNotificationList(updatedNotifications);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} relative h-screen w-full flex-1`}>
      <StatusBar
        barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
        backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`}
      />
      <View className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full p-3 pt-6`}>
        <TopBarTwo title="Notifications" />
      </View>
      <ScrollView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full`}>
        <View className="flex-1 mt-4 px-3">
          {notificationList.map(notification => (
           <TouchableRipple
           key={notification.id}
           rippleColor="#999999"
           onPress={() => handleDeleteNotification(notification.id)}
           className={`${
            theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100 border border-gray-200'
          } rounded-lg p-4 mb-3`}
           >
           <View
                 
            >
              <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>
                {notification.title}
              </Text>
              <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                {notification.message}
              </Text>
              <Text className={`${theme === 'dark' ? 'text-orange-500' : 'text-orange-500 '} font-medium text-xs mt-2`}>
                {notification.timestamp}
              </Text>
            </View>
            </TouchableRipple>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
