import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dtos/respone.dto';
import { ELogStatus, EResponse } from '../enums';
import { LogService } from 'src/log/log.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
  constructor(private readonly logService: LogService) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
    const request = context.switchToHttp().getRequest();
    const requestNumber = uuidv4();
    return next.handle().pipe(
      map((data) => {
        const { message, data: resData } = data;
        const user = request.user;
        const method = request.method;
        const url = request.url;
        const createdBy = user ? user.email : 'Unknown';


        console.log(`Method: ${method}, URL: ${url}`);


        // Create Log With Success Status
        this.logService.create({
          requestNumber,
          status: ELogStatus.SUCCESS,
          createdBy,
          paths: url,
          method
        });


        const response: ResponseDto<T> = {
          status: EResponse.SUCCESS,
          message: message || "Request processed successfully",
          data: resData,
        };
        return response;
      }),
    );
  }
}
