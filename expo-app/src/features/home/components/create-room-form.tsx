import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useCreateRoom } from '../hooks/use-create-room';

export function CreateRoomForm() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateRoom();

  const handleCreate = () => {
    if (!name.trim()) return;

    mutate(
      { name },
      {
        onSuccess: () => {
          setOpen(false);
          setName('');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Text>Create Room</Text>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>Enter a name for the new room.</DialogDescription>
        </DialogHeader>

        <View className="gap-4 py-4">
          <Input
            placeholder="Room Name (e.g. General)"
            value={name}
            onChangeText={setName}
            editable={!isPending}
          />
        </View>

        <View className="flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={handleCreate} disabled={isPending}>
            <Text>{isPending ? 'Creating...' : 'Create'}</Text>
          </Button>
        </View>
      </DialogContent>
    </Dialog>
  );
}
