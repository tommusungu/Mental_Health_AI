import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Vibration,
  Alert, // Import Alert for confirmation dialog
} from 'react-native';
import React, { useEffect } from 'react';
import TopBarTwo from '../components/TopBarTwo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatHistory,
  selectUser,
  setChatHistory,
} from '../slices/navSlice';
import { TouchableRipple, IconButton } from 'react-native-paper'; // Import IconButton for the delete button
import apiRequest from '../utils/api';
import { useTheme } from '../../themeContext';
import Markdown from 'react-native-markdown-display';
import { color } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ChatCard from '../components/ChatCard';

const ChatsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chatHistory = useSelector(selectChatHistory);
  console.log('chatHistoryChatsScreen: ', chatHistory);
  const { theme } = useTheme();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await apiRequest.get(`/chats/chatHistory/${user.id}`);
        if (response.status) {
          dispatch(setChatHistory(response.data));
        }
      } catch (error) {
        // Handle error (optionally log it)
        dispatch(setChatHistory([])); // Clear chat history on error
      }
    };

    fetchChatHistory();
  }, [user.id]); // Dependency on user.id

  // Function to delete a conversation
  const deleteConversation = async (conversationId) => {
    try {
      await apiRequest.delete(
        `/chats/deleteConversation/${conversationId}/${user.id}`
      ); // Adjust endpoint as needed
      // Refresh chat history after deletion
      const response = await apiRequest.get(`/chats/chatHistory/${user.id}`);
      if (response.status) {
        dispatch(setChatHistory(response.data));
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleDeletePress = (conversationId) => {
    Alert.alert(
      'Delete Conversation',
      'Are you sure you want to delete this conversation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteConversation(conversationId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView
      className={`${
        theme === 'dark' ? 'bg-[#101010]' : 'bg-white'
      } relative h-screen flex-1 `}
    >
      <StatusBar
        barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`}
        backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`}
      />
      <View
        className={`${
          theme === 'dark' ? 'bg-[#101010]' : 'bg-white'
        } w-full p-3 pt-6`}
      >
        <TopBarTwo title="Chats" />
      </View>
      <ScrollView
        className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} w-full`}
      >
        <View className="flex-1 mt-2">
          {chatHistory && chatHistory?.length > 0 ? (
            <>
              {chatHistory?.map((chat) =>
                chat?.messages?.map((message) => {
                  // Get the most recent conversation (last item in the conversation array)
                  const mostRecentConversation =
                    message?.conversation?.slice(-1)[0]; // Get the last item in the array

                  return mostRecentConversation ? (
                    <View
                      key={`${mostRecentConversation._id}`}
                      className="flex-row justify-between"
                    >
                      <ChatCard
                        conversation={mostRecentConversation} // Pass the most recent conversation only
                        message={message}
                        theme={theme}
                        handleDeletePress={handleDeletePress}
                      />
                    </View>
                  ) : null;
                })
              )}
            </>
          ) : (
            <Text
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }  text-center mt-4`}
            >
              No Chats Available!
            </Text>
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

export default ChatsScreen;
