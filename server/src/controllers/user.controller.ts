import type { Request, Response } from 'express';
import { NotFoundError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-codes';

import { CreateUserRequest } from '@/dto/user/create-user.dto';
import { userService } from '@/services/user.service';

export class UserController {
  private readonly userService = userService;

  public auth = async (req: CreateUserRequest, res: Response) => {
    const { username } = req.body;

    let user = await this.userService.getByUsername(username);

    if (!user) user = await this.userService.create({ username });

    return res.status(StatusCodes.OK).send(user);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const user = await this.userService.getById(id);

    if (!user) throw new NotFoundError(`User with id ${id} not found`);

    return res.status(StatusCodes.OK).send(user);
  };
}

export const userController = new UserController();
