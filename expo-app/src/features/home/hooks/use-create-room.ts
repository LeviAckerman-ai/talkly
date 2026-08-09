import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createRoomApi } from '../api/create-room.api';

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
