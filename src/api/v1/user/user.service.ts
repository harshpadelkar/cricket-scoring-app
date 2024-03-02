import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/api/v1/prisma/prisma.service';
import { CreateUserDto } from '../../../common/dtos/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.findByEmail(dto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
