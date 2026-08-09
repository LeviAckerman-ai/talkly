import { Chat, IMessage } from '@kesha-antonov/react-native-chat';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMessages } from '@/features/room/hooks/use-messages';
import { useRefreshOnFocus } from '@/hooks/use-refresh-on-focus';
import { useAuthStore } from '@/store/auth';
import { useSocketStore } from '@/store/socket';

export default function RoomChattingScreen() {
  const { id: roomId } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data, refetch, isPending, fetchNextPage, hasNextPage } = useMessages(roomId);

  useRefreshOnFocus(refetch);

  const [prevData, setPrevData] = useState<IMessage[] | undefined>(undefined);

  if (data !== prevData) {
    setPrevData(data);
    if (data) {
      setMessages(data);
    }
  }

  useEffect(() => {
    if (!roomId || !socket) return;

    socket.emit('join_room', roomId);

    const onReceiveMessage = (message: IMessage) => {
      setMessages((previousMessages) => Chat.append(previousMessages, [message]));
    };

    socket.on('receive_message', onReceiveMessage);

    return () => {
      socket.off('receive_message', onReceiveMessage);
      socket.emit('leave_room', roomId);
    };
  }, [roomId, socket]);

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      if (newMessages.length > 0 && roomId && socket) {
        setMessages((previousMessages) => Chat.append(previousMessages, newMessages));
        socket.emit('send_message', { roomId, message: newMessages[0] });
      }
    },
    [roomId, socket],
  );

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Chat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.id || 1,
        name: user?.username || 'User',
        avatar: (user as any)?.avatar,
      }}
      renderAvatar={(props: any) => {
        const messageUser = props.currentMessage?.user;
        const initial = messageUser?.name?.charAt(0).toUpperCase() || 'U';

        return (
          <Avatar className="mt-1 mr-2 h-8 w-8" alt={`${initial}'s avatar`}>
            {messageUser?.avatar ? (
              <AvatarImage source={{ uri: messageUser.avatar as string }} />
            ) : null}
            <AvatarFallback>
              <Text className="text-sm font-semibold">{initial}</Text>
            </AvatarFallback>
          </Avatar>
        );
      }}
      loadEarlierMessagesProps={{
        isAvailable: !!hasNextPage,
        isLoading: isPending,
        onPress: () => {
          if (hasNextPage && !isPending) {
            fetchNextPage();
          }
        },
      }}
      isAvatarVisibleForEveryMessage={true}
      isUsernameVisible={true}
    />
  );
}
