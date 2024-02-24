import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGaurd } from 'src/auth/gaurds/jwt.gaurd';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  @UseGuards(JwtGaurd)
  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getUser(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }
}
