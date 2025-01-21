import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectQuestion, selectUser } from '../slices/navSlice';
import TopBarTwo from '../components/TopBarTwo';
import { chats } from '../hooks/Database';

const ChatScreen = () => {
  const [messageText, setMessageText] = useState('');
  const [currentChat, setCurrentChat] = useState(null);

  const chatData = useSelector(selectQuestion);
  const user = useSelector(selectUser);
  const uid = user.id;

  // Use useEffect to update currentChat whenever chatData changes
  useEffect(() => {
    if (chatData?.id) {
      // Find existing chat by ID or use chatData directly if it's a new message
      const chat = chats.find((c) => c?.id === chatData?.id) || chatData;
      setCurrentChat(chat);
    } else {
      // Initialize a new chat from scratch
      setCurrentChat({
        id: null,
        messages: chatData?.messageText
          ? [
              {
                messageId: Math.random().toString(36).substring(7),
                text: chatData.messageText,
                senderId: uid,
                timestamp: Date.now(),
              },
            ]
          : [],
      });
    }
  }, [chatData, uid]);

  const handleSendMessage = () => {
    // post to 192.168.21.39:3000

    if (messageText.trim()) {
      // Update the messages array in currentChat with the new message
      setCurrentChat((prevChat) => ({
        ...prevChat,
        messages: [
          ...(prevChat?.messages || []),
          {
            messageId: Math.random().toString(36).substring(7),
            text: messageText,
            senderId: uid,
            timestamp: Date.now(),
          },
        ],
      }));
      setMessageText('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#101010]">
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <View className="w-full bg-[#101010] p-3 pt-6">
        <TopBarTwo title="Chat" />
      </View>
      <ScrollView className="bg-[#101010] py-3 w-full flex-1">
        <View className="flex-1 relative p-3">
          {currentChat?.messages && currentChat.messages.length > 0 ? (
            currentChat.messages.map((message) => (
              <View
                key={message.messageId}
                className={`p-4 my-2 ${
                  message.senderId === uid
                    ? 'bg-[#505050] ml-auto rounded-lg rounded-tr-none'
                    : 'bg-[#202020] rounded-lg rounded-tl-none mr-auto'
                }`}
              >
                <Text className="text-white">{message.text}</Text>
                <Text className="text-gray-400 text-xs">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-400 text-center mt-4">
              Start a new chat.
            </Text>
          )}
        </View>
      </ScrollView>
      <View className="flex-row items-center w-full bg-[#000000] border-t border-[#303030] p-3 pt-2 pb-6">
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="How may I help..."
          placeholderTextColor="#808080"
          className="flex-1 h-[52px] px-4 bg-[#202020] text-gray-200 rounded-lg text-lg"
        />
        <TouchableOpacity onPress={handleSendMessage} className="ml-4">
          <Ionicons name="send" size={24} color="#ea580c" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
