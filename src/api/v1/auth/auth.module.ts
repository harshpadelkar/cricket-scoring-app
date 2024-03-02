import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/api/v1/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthModule } from './jwt.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, UserService, PrismaService, JwtService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtAuthModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  exports: [JwtAuthModule],
})
export class AuthModule {}
