import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';


@Global()
@Module({
    imports:[NestConfigModule.forRoot({
        envFilePath:".env",
        isGlobal:true
    })],
    providers: [ConfigService],
    exports:[ConfigService]
})
export class ConfigModule {}
