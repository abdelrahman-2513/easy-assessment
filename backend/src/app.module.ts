import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { LogService } from './log/log.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/filters/all-exception.filter';
import { TransformInterceptor } from './shared/transformers/transformer.interceptor';


@Module({
  imports: [ConfigModule,
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
    }) ,LogModule,AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ConfigService,
    {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }],
})
export class AppModule {}
