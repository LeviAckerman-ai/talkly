import { FlatList, View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useSocketStore } from '@/store/socket';
import { OnlineUser } from '@/store/socket/type';

export function OnlineUsers() {
  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  if (!onlineUsers || onlineUsers.length === 0) {
    return null;
  }

  const renderItem = ({ item }: { item: OnlineUser }) => {
    const initial = item.username?.charAt(0).toUpperCase() || 'U';

    return (
      <View className="mr-4 items-center">
        <View className="relative">
          <Avatar alt="" className="border-primary/10 h-14 w-14 border-2">
            {item.avatar ? <AvatarImage source={{ uri: item.avatar }} /> : null}
            <AvatarFallback>
              <Text className="text-lg font-semibold">{initial}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="border-background absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 bg-green-500" />
        </View>
        <Text className="text-muted-foreground mt-1 text-xs" numberOfLines={1}>
          {item.username}
        </Text>
      </View>
    );
  };

  return (
    <View className="mb-6">
      <Text variant="h3" className="mb-3">
        Online Users
      </Text>
      <FlatList
        data={onlineUsers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || `online-${index}`}
        renderItem={renderItem}
      />
    </View>
  );
}
