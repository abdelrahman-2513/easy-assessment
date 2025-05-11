import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../dtos/respone.dto';
import { ELogStatus, EResponse } from '../enums';
import { LogService } from 'src/log/log.service';
import { v4 as uuidv4 } from 'uuid';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logService: LogService) { }

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message || 'Something went wrong';

    const formattedResponse: ResponseDto<null> = {
      status: EResponse.FAILED,
      message,
      data: null,
    };

    const requestNumber = uuidv4();
    const method = request.method;
    const user = request.user;
    const url = request.url;
    const createdBy = user ? user["email"] : 'Unknown';

    console.log(`Method: ${method}, URL: ${url}`);


    // Create Log with Failed status
    this.logService.create({
      requestNumber,
      status: ELogStatus.FAILED,
      createdBy,
      paths: url,
      method
    });

    response.status(status).json(formattedResponse);
  }
}
