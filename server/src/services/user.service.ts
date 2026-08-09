import { User } from '@/db';
import { PaginationQueryDto } from '@/dto/common/pagination.dto';
import { CreateUserDto } from '@/dto/user/create-user.dto';
import { mongooseUserToDtoSchema, UserDto } from '@/dto/user/user.dto';

export class UserService {
  private readonly userTable = User;

  public async getAll(query: PaginationQueryDto) {
    const { page, limit, search, cursor } = query;
    const filter: Record<string, any> = {};

    if (search) {
      filter.username = { $regex: search, $options: 'i' };
    }

    if (cursor) {
      filter._id = { $gt: cursor };
    }

    const result = await this.userTable.paginate(filter, { page, limit });

    return {
      ...result,
      docs: result.docs.map((doc) => mongooseUserToDtoSchema.parse(doc)),
    };
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userTable.create(createUserDto);
    return mongooseUserToDtoSchema.parse(user);
  }

  public async isExistingUsername(username: string): Promise<boolean> {
    const userExists = await this.userTable.exists({ username });
    return !!userExists;
  }

  public async getById(id: string): Promise<UserDto | null> {
    const user = await this.userTable.findById(id);
    return user ? mongooseUserToDtoSchema.parse(user) : null;
  }

  public async getByUsername(username: string): Promise<UserDto | null> {
    const user = await this.userTable.findOne({ username });
    return user ? mongooseUserToDtoSchema.parse(user) : null;
  }
}

export const userService = new UserService();
