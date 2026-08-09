import type { Request, Response } from 'express';
import { NotFoundError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-codes';

import { PaginationRequest } from '@/dto/common/pagination.dto';
import { CreateRoomRequest } from '@/dto/room/create-room.dto';
import { roomService } from '@/services/room.service';

export class RoomController {
  private readonly roomService = roomService;

  public getAll = async (req: PaginationRequest, res: Response) => {
    const result = await this.roomService.getAll(req.query);

    return res.status(StatusCodes.OK).send(result);
  };

  public create = async (req: CreateRoomRequest, res: Response) => {
    const room = await this.roomService.create(req.body);

    return res.status(StatusCodes.CREATED).send(room);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const room = await this.roomService.getById(id);

    if (!room) throw new NotFoundError(`Room with id ${id} not found`);

    return res.status(StatusCodes.OK).send(room);
  };
}

export const roomController = new RoomController();
