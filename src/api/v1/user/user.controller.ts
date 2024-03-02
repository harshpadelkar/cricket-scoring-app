import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JWTAuthGuard } from 'src/common/gaurds/jwt.gaurd';
import { UserJwtPayload } from 'src/common/decorators/auth.decorator';
import { JwtPayloadUserDetails } from 'src/common/interfaces';
import { TournamentService } from 'src/api/v1/tournament/tournament.service';
import { createTournamentDto } from 'src/common/dtos/tournament/create-tournament.dto';

@Controller('user')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tournamentService: TournamentService,
  ) {}

  @Get('bio')
  @UsePipes(new ValidationPipe())
  async getUser(@UserJwtPayload() user: JwtPayloadUserDetails) {
    return await this.userService.findById(user.userId);
  }

  @Get('tournaments')
  @UsePipes(new ValidationPipe())
  async getUserTournaments(@UserJwtPayload() user: JwtPayloadUserDetails) {
    return await this.tournamentService.fetchTournamentsByUserId(user.userId);
  }

  @Post('tournament')
  async createTournament(
    @UserJwtPayload() user: JwtPayloadUserDetails,
    @Body() data: createTournamentDto,
  ) {
    return await this.tournamentService.createTournament(data, user.userId);
  }
}
