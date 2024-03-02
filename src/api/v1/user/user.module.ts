import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/api/v1/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TournamentService } from 'src/api/v1/tournament/tournament.service';

@Module({
  providers: [UserService, PrismaService, JwtService, TournamentService],
  controllers: [UserController],
})
export class UserModule {}
