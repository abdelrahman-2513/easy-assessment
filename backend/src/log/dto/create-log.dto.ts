import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ELogStatus } from '../../shared/enums';

export class CreateLogDto {
    @IsString()
    requestNumber: string;
    @IsString()
    paths: string;
    @IsString()
    method: string;

    @IsOptional()
    @IsString()
    createdBy: string;

    @IsEnum(ELogStatus)
    status: string;

    @IsOptional()
    @IsString()
    message?: string;
}
