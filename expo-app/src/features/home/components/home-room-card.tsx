import React from 'react';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Room } from '../schema/room.schema';

interface HomeRoomCardProps {
  room: Room;
}

export function HomeRoomCard({ room }: HomeRoomCardProps) {
  return (
    <Card className="p-4">
      <Text className="font-semibold">{room.name || 'Unnamed Room'}</Text>
      <Text className="text-muted-foreground mt-1 text-xs">
        {new Date(room.createdAt).toLocaleDateString()}
      </Text>
    </Card>
  );
}
