import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';


@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET', 'J0ZY74ZxzFGQK7p26IyoWIlBKAuolOwB'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
