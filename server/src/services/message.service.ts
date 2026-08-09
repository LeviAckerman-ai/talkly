import { Message } from '@/db/schemas/message.schema';
import { PaginationQueryDto } from '@/dto/common/pagination.dto';

export class MessageService {
  private readonly messageTable = Message;

  public async getByRoomId(roomId: string, query: PaginationQueryDto) {
    const { page, limit } = query;

    const result = await this.messageTable.paginate(
      { room: roomId },
      {
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        sort: { createdAt: -1 },
        populate: {
          path: 'sender',
          select: '_id username email avatar',
        },
      },
    );

    return result;
  }
}

export const messageService = new MessageService();
