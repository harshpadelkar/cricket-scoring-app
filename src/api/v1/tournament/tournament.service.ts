import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/api/v1/prisma/prisma.service';
import { createTournamentDto } from 'src/common/dtos/tournament/create-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}

  async fetchTournamentsByUserId(userId: string) {
    return await this.prisma.tournament.findMany({ where: { userId } });
  }

  async createTournament(data: createTournamentDto, userId: string) {
    try {
      const response = await this.prisma.tournament.create({
        data: {
          ...data,
          userId,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
