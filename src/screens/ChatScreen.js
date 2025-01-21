import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatHistory,
  selectUser,
  setChatHistory,
} from '../slices/navSlice';
import TopBarTwo from '../components/TopBarTwo';
import apiRequest from '../utils/api';
import { useTheme } from '../../themeContext';
import Markdown from 'react-native-markdown-display';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatCreatedId, setchatCreatedId] = useState('');
  const [chatHistor, setChatHistoryy] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const [inputHeight, setInputHeight] = useState(52);
  // Track whether the first message has been sent
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Function to handle first message submission
  const handleFirstMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const response = await apiRequest.post('/chats/postChat', {
        user,
        message,
      });
      setchatCreatedId(response.data.createdConversation._id);
      const dataResponse = await apiRequest.get(
        `/chats/chatHistory/${user.id}`
      );

      dispatch(setChatHistory(dataResponse.data));
      setChatHistoryy([
        ...chatHistor,
        { user: user.firstName, text: message },
        { user: 'Serenity AI', text: response.data.response },
      ]);
      setMessage('');
      setIsFirstMessage(false); // Set flag to false after sending the first message
    } catch (error) {
      console.error('Error sending first message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle subsequent messages
  const handleSubsequentMessages = async () => {
    if (!message.trim()) return;
    setLoading(true);
    console.log('we are running!');
    try {
      //messageId
      const response = await apiRequest.post(
        `/chats/addConversation/${chatCreatedId}`,
        {
          user,
          message,
        }
      );
      setChatHistoryy([
        ...chatHistor,
        { user: user.firstName, text: message },
        { user: 'Serenity AI', text: response.data.response },
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error sending subsequent message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Wrapper function to decide which handler to use
  const handleMessage = () => {
    if (isFirstMessage) {
      handleFirstMessage();
    } else {
      handleSubsequentMessages();
    }
  };

  return (
    <SafeAreaView
      className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}
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
        <TopBarTwo title="Chat" />
      </View>

      <ScrollView
        className={`${
          theme === 'dark' ? 'bg-[#101010]' : 'bg-white'
        } py-3 w-full flex-1`}
      >
        <View className="flex-1 relative gap-3 p-3">
          {chatHistor.length > 0 ? (
            chatHistor.map((item, index) => (
              <View
                key={index}
                className={`p-4 ${
                  item.user === user.firstName
                    ? `${
                        theme === 'dark' ? 'bg-[#505050]' : 'bg-gray-100'
                      } ml-auto max-w-[75%] rounded-3xl rounded-tr-none`
                    : `${
                        theme === 'dark' ? 'bg-[#202020]' : 'bg-gray-100'
                      } mr-auto max-w-[75%] rounded-3xl rounded-tl-none`
                }`}
              >
                <Text
                  className={`font-bold ${
                    item.user === user.firstName
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}
                >
                  {item.user}
                </Text>
                <Markdown
                  style={{
                    body: {
                      color: theme === 'dark' ? '#FFFFFF' : '#1F2937',
                      fontSize: 15,
                      fontWeight: '500',
                    },
                    heading1: {
                      color: theme === 'dark' ? '#FFFFFF' : '#1F2937',
                    },
                  }}
                >
                  {item.text}
                </Markdown>
              </View>
            ))
          ) : (
            <Text
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }  text-center mt-4`}
            >
              Start a new chat.
            </Text>
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
            minHeight: 52,
            maxHeight: 250,
            paddingVertical: 12,
          }}
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
        />

        <TouchableOpacity
          onPress={handleMessage}
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

export default ChatScreen;
