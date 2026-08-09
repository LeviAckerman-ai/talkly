import { Chat, IMessage } from '@kesha-antonov/react-native-chat';
import React, { useCallback, useEffect, useState } from 'react';

export default function RoomChattingScreen() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/140?u=johndoe',
      },
    },
    {
      _id: 2,
      text: 'Hello! This is my message.',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Me',
        avatar: 'https://i.pravatar.cc/140?u=me',
      },
    },
  ]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => Chat.append(previousMessages, messages));
  }, []);

  return (
    <Chat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      isAvatarVisibleForEveryMessage={true}
    />
  );
}
