import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import AuthController from './controller/auth.controller';
import UsersModule from '../users/users.module';
import LocalStrategy from './strategy/local.strategy';
import JwtStrategy from './strategy/jwt.strategy';
import JwtRefreshTokenStrategy from './strategy/refresh.strategy';
import {
  getTokenAuthService,
  registerAuthService,
  validateUserAuthService,
  getTokenAuthApplication,
  registerAuthApplication,
} from './auth.providers';
import { JwtRegister } from '../../infrastructure/config/jwt.register';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtRegister],
  providers: [
    getTokenAuthService,
    registerAuthService,
    validateUserAuthService,
    getTokenAuthApplication,
    registerAuthApplication,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [getTokenAuthService],
})
export default class AuthModule {}
