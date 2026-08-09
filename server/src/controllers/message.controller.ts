import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PaginationRequest } from '@/dto/common/pagination.dto';
import { messageService } from '@/services/message.service';

export class MessageController {
  private readonly messageService = messageService;

  public getByRoomId = async (req: PaginationRequest, res: Response) => {
    const { roomId } = req.params as { roomId: string };

    const result = await this.messageService.getByRoomId(roomId, req.query);

    return res.status(StatusCodes.OK).send(result);
  };
}

export const messageController = new MessageController();
