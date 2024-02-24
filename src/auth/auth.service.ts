import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const payload = { sub: { name: user.name }, username: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: process.env.JWT_SECRET_KEY,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    return { accessToken, refreshToken };
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...newUser } = user;
    const isValidPassword = await compare(dto.password, password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return newUser;
  }
}
