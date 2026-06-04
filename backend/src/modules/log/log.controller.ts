import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LogService } from './log.service';
import { ResponseDto } from '../shared/dtos/respone.dto';
import { Log } from './entities/log.entity';
import { EResponse } from '../shared/enums';

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
