import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../../../common/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
