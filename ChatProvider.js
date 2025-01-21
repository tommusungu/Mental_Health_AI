import React from 'react';
import { Chat } from 'stream-chat-react-native';
import client from './streamClient';

const ChatProvider = ({ children }) => {
  return <Chat client={client}>{children}</Chat>;
};

export default ChatProvider;
