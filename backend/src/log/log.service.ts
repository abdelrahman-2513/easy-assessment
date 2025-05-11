import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { ELogStatus } from 'src/shared/enums'; 
import { Log, logDocument } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<logDocument>,
  ) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {

    const createdLog = new this.logModel(createLogDto);
    return createdLog.save();
  }

  async getAllLogs(): Promise<Log[]>{
    return await this.logModel.find({});
  }

  async updateLogSuccess(requestNumber: string, message: string): Promise<Log> {

    return this.logModel.findOneAndUpdate(
      { requestNumber }, 
      {
        status: ELogStatus.SUCCESS,
        message,
        updatedAt: new Date(),
      }, 
      { new: true } 
    );
  }


  async updateLogFailed(requestNumber: string, message: string): Promise<Log> {
    return this.logModel.findOneAndUpdate(
      { requestNumber }, 
      {
        status: ELogStatus.FAILED,
        message,
        updatedAt: new Date(),
      },
      { new: true }
    );
  }

  async getLogsByStatus(status: ELogStatus): Promise<Log[]> {
    return this.logModel.find({ status });
  }

  async getLogByRequestNumber(requestNumber: string): Promise<Log | null> {
    return this.logModel.findOne({ requestNumber });
  }
}
