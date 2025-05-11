import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ResponseDto } from 'src/shared/dtos/respone.dto';
import { Log } from './entities/log.entity';
import { EResponse } from 'src/shared/enums';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) { }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseDto<Log[]>> {
    const logs = await this.logService.getAllLogs();

    return {
      status: EResponse.SUCCESS,
      message: "Logs Returned Successfully",
      data: logs
    }
  }
}
