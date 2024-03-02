import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/v1/user/user.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { PrismaService } from './api/v1/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { TournamentModule } from './api/v1/tournament/tournament.module';
import configuration from './config/app.config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate }),
    UserModule,
    AuthModule,
    TournamentModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
