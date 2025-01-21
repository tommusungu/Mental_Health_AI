import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../themeContext';
import { useDispatch } from 'react-redux';
import { setConversationId } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const ChatCard = ({ conversation, message, handleDeletePress }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const conversationType = 'SerenityAI';
  const navigation = useNavigation();
  return (
    <TouchableRipple
      className={`${
        theme === 'dark'
          ? 'border-b border-[#202020]'
          : 'border-b border-gray-100'
      } p-2 py-2.5 flex-1`}
      rippleColor="#999999"
      onLongPress={() => handleDeletePress(conversation._id)}
      onPress={() => {
        dispatch(
          setConversationId({
            _id: message._id,
            title: conversation.title || 'Untitled Conversation',
          })
        );
        if (conversationType === conversation?.ai?.sender) {
          navigation.navigate('ChatTwo');
        } else {
          navigation.navigate('ProfessionalChatTwo');
        }
      }}
    >
      <View className="w-full flex-row justify-between items-center px-2">
        <View className=" flex-row justify-start gap-2.5 items-center ">
          {/* User Image */}
          {conversationType === conversation?.ai?.sender ? (
            <View
              className={`${
                theme === 'dark' ? 'bg-[#303030]' : 'bg-[#303030]'
              } w-12 h-12 rounded-full justify-center items-center`}
            >
              <Text
                className={`${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-100'
                } text-base font-medium`}
              >
                AI
              </Text>
            </View>
          ) : (
            <>
              {/* <Image
          src="https://lh3.googleusercontent.com/a/ACg8ocLdNgEU7XrBIQp8mwgtO75axXXKZ9ztOXJ-H-9CzJv9LYEEkzRj=s96-c"
          resizeMode="contain"
          className="w-12 h-12 rounded-full"
        /> */}
              <View
                className={`${
                  theme === 'dark' ? 'bg-[#303030]' : 'bg-[#303030]'
                } w-12 h-12 rounded-full justify-center items-center`}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={`${theme === 'dark' ? '#e5e7eb' : '#e5e7eb'}`}
                />
              </View>
            </>
          )}

          <View className="w-[70%]">
            <Text
              className={`${
                theme === 'dark' ? 'text-gray-200' : 'text-black'
              } font-semibold text-lg`}
            >
              {conversation.ai.sender}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
              style={{
                fontSize: 14, // font size
                fontWeight: '400', // font weight
                overflow: 'hidden', // prevent overflow
              }}
            >
              {conversation.title || 'Untitled Conversation'}
            </Text>
          </View>
        </View>
        {/* Time and Message Count */}
        <View className="justify-center">
          <Text
            className={`${
              theme === 'dark' ? ' text-gray-400' : ' text-gray-600'
            } text-sm`}
          >
            {(() => {
              const updatedAtDate = new Date(conversation.updatedAt);
              const now = new Date();

              const isToday =
                updatedAtDate.toDateString() === now.toDateString();
              const isYesterday =
                new Date(now.setDate(now.getDate() - 1)).toDateString() ===
                updatedAtDate.toDateString();

              if (isToday) {
                // Show only the time if it's today
                return updatedAtDate.toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit',
                });
              } else if (isYesterday) {
                // Show 'Yesterday' if it's yesterday
                return 'Yesterday';
              } else {
                // Show the full date for older messages
                return updatedAtDate.toLocaleDateString(undefined, {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
              }
            })()}
          </Text>

          {/* <View className="w-6 h-6 mt-2 bg-green-500 rounded-full items-center justify-center">
            <Text className="text-gray-50 text-sm">2</Text>
          </View> */}
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ChatCard;
