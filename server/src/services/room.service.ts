import { Room } from '@/db';
import { PaginationQueryDto } from '@/dto/common/pagination.dto';
import { CreateRoomDto } from '@/dto/room/create-room.dto';
import { mongooseRoomToDtoSchema, RoomDto } from '@/dto/room/room.dto';

export class RoomService {
  private readonly roomTable = Room;

  public async getAll(query: PaginationQueryDto) {
    const { page, limit, search, cursor } = query;
    const filter: Record<string, any> = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (cursor) {
      filter._id = { $gt: cursor };
    }

    const result = await this.roomTable.paginate(filter, { page, limit });

    return {
      ...result,
      docs: result.docs.map((doc) => mongooseRoomToDtoSchema.parse(doc)),
    };
  }

  public async create(createRoomDto: CreateRoomDto): Promise<RoomDto> {
    const room = await this.roomTable.create(createRoomDto);
    return mongooseRoomToDtoSchema.parse(room);
  }

  public async getById(id: string): Promise<RoomDto | null> {
    const room = await this.roomTable.findById(id);
    return room ? mongooseRoomToDtoSchema.parse(room) : null;
  }
}

export const roomService = new RoomService();
