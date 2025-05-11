import { Global, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, logSchema } from './entities/log.entity';

@Global()
@Module({
  imports:[MongooseModule.forFeature([{name:Log.name,schema:logSchema}])],
  controllers: [LogController],
  providers: [LogService],
  exports:[LogService]
})
export class LogModule {}
