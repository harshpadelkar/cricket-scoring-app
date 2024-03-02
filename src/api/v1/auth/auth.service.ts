import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from '../../../common/dtos/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/api/v1/prisma/prisma.service';
import { JwtPayload, JwtPayloadUserDetails } from 'src/common/interfaces';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<{ secret: string }>('jwt')?.secret,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadUserDetails> {
    const { userId } = payload;
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token || this.tokenExpired(token)) {
      throw new UnauthorizedException();
    }
    if (userId) {
      const userDetails = await this.prismaService.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!userDetails) {
        throw new UnauthorizedException();
      }
    }
    return {
      userId,
      token,
    };
  }

  tokenExpired(token: string): boolean {
    try {
      this.jwtService.verifyAsync(token, {
        secret: this.configService.get<{ secret: string }>('jwt')?.secret,
      });
      return false;
    } catch (error) {
      return true;
    }
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const payload = { userId: user.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: this.configService.get<{ secret: string }>('jwt')?.secret,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get<{ secret: string }>('jwt')?.secret,
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
