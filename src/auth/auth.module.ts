import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/users.entity';
import { Boardrooms } from '../boardroom/boardroom.entity';
import { Reservations } from '../reservations/reservations.entity';

@Module({
  imports : [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      cache : {
        enabled : false
      },
      discovery : {
        disableDynamicFileAccess : true
      },
      entities : [
        Boardrooms,
        Reservations,
        Users
      ]
    }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : { expiresIn : process.env.JWT_TTL }
    }),
    MikroOrmModule.forFeature([
      Boardrooms,
      Reservations,
      Users
    ])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
