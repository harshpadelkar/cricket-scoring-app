import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { PrismaService } from 'src/api/v1/prisma/prisma.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, PrismaService],
})
export class TournamentModule {}
