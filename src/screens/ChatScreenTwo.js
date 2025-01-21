import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { selectConversationId, selectUser } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import { useTheme } from '../../themeContext';
import TopBarTwo from '../components/TopBarTwo';
import Markdown from 'react-native-markdown-display';
import apiRequest from '../utils/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';

const ChatScreenTwo = () => {
  const conversationId = useSelector(selectConversationId);
  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const toast = useToast();
  const [inputHeight, setInputHeight] = useState(52);

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch conversation history on component mount
  useEffect(() => {
    fetchConversationHistory();
  }, [conversationId, user?.id]);
  const fetchConversationHistory = async () => {
    try {
      const response = await apiRequest.get(
        `/chats/getConvoHistory/${user?.id}/${conversationId?._id}`
      );
      if (response.status) {
        setChatHistory(response.data.conversation);
      }
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      toast.show('Failed to load chat history.', {
        type: 'danger',
        duration: 4000,
      });
    }
  };
  // Handle sending a new message
  const handleSubmit = async () => {
    if (!message.trim()) return; // Prevent empty messages
    setLoading(true);
    try {
      const response = await apiRequest.post(
        `/chats/addConversation/${conversationId?._id}`,
        {
          user,
          message,
        }
      );

      if (response.status) {
        // Append the AI response and user message to the chat history
        await fetchConversationHistory();
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.show('Failed to send message.', {
        type: 'danger',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateOrTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // Return time in 12-hour format
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    // Return date in "Month Day, Year" format for older dates
    return date.toLocaleDateString([], {
      month: 'short', // Short month name (e.g., "Dec")
      day: 'numeric', // Day of the month
      year: 'numeric', // Full year
    });
  };

  return (
    <SafeAreaView
      className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1`}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#101010' : '#ffffff'}
      />
      <View
        className={`${
          theme === 'dark' ? 'bg-[#101010]' : 'bg-white'
        } w-full p-3 pt-6`}
      >
        <TopBarTwo title="Chat" />
      </View>
      <ScrollView
        className={`${
          theme === 'dark' ? 'bg-[#101010]' : 'bg-white'
        } py-3 w-full flex-1`}
      >
        <View className="flex-1 relative p-3">
          {chatHistory && chatHistory?.length > 0 ? (
            chatHistory?.map((item, index) => (
              <View key={index} className="flex-1 gap-3 mb-4">
                {/* User Message */}
                <View
                  className={` ${
                    item?.user?.sender === user?.firstName &&
                    `${
                      theme === 'dark' ? 'bg-[#404040]' : 'bg-gray-100'
                    } ml-auto rounded-3xl max-w-[75%] rounded-tr-none`
                  }`}
                >
                  <View className="w-[90%] p-4 pb-0 flex-row justify-between items-center">
                    <Text
                      className={`font-bold ${
                        item?.user?.sender === user?.firstName
                          ? 'text-green-600'
                          : 'text-orange-600'
                      }`}
                    >
                      {item?.user?.sender}
                    </Text>
                    <Text className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} font-bold text-xs `}>
                        {formatDateOrTime(item?.updatedAt)}
                    </Text>
                  </View>

                  <View className="p-4 pb-2 pt-2">
                    <Markdown
                      style={{
                        body: {
                          color: theme === 'dark' ? '#FFFFFF' : '#1F2937',
                          fontSize: 15,
                          fontWeight: '500',
                        },
                      }}
                    >
                      {item?.user?.text}
                    </Markdown>
                  </View>
                </View>

                {/* AI Message */}
                <View
                  className={` ${
                    item?.ai?.sender !== user?.firstName &&
                    `${
                      theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100'
                    } mr-auto rounded-3xl max-w-[75%] rounded-tl-none`
                  }`}
                >
                  <View className="w-[90%] p-4 pb-0 flex-row justify-between items-center">
                    <Text
                      className={`font-bold ${
                        item?.ai?.sender !== user?.firstName
                          ? 'text-blue-600'
                          : 'text-orange-600'
                      }`}
                    >
                      {item?.ai?.sender}
                    </Text>

                    <Text className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-bold text-xs `}>
                        {formatDateOrTime(item?.updatedAt)}
                    </Text>
                  </View>
                  <View className="p-4 pb-2 pt-2">
                    <Markdown
                      style={{
                        body: {
                          color: theme === 'dark' ? '#FFFFFF' : '#1F2937',
                          fontSize: 15,
                          fontWeight: '500',
                        },
                      }}
                    >
                      {item?.ai?.text}
                    </Markdown>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <ActivityIndicator size={28} color="#999999" />

          )}
        </View>
      </ScrollView>

      <View
        className={`${
          theme === 'dark'
            ? 'bg-[#000000] border-t border-[#303030]'
            : 'bg-gray-100 border-t border-gray-200'
        } flex-row items-end w-full  p-3 pt-2 pb-4`}
      >
        <TextInput
          className={`${
            theme === 'dark'
              ? 'bg-[#202020] text-gray-200'
              : 'bg-white text-black'
          } flex-1 px-5 rounded-[32] text-lg`}
          value={message}
          onChangeText={(text) => setMessage(String(text))}
          placeholder="Enter a prompt here..."
          placeholderTextColor="#808080"
          editable={!loading}
          keyboardType="default"
          multiline
          style={{
            height: inputHeight,
            minHeight: 52, // Ensure minimum height
            maxHeight: 250, // Optional: cap the maximum height
            paddingVertical: 12,
          }}
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="ml-4 bg-[#ea580c] rounded-full h-[52] w-[52] justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Ionicons name="send" size={18} color="#ffffff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreenTwo;
