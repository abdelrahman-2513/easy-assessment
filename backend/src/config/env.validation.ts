import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  THROTTLE_TTL: number = 60;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  THROTTLE_LIMIT: number = 10;
}

/**
 * Validates the process environment against the schema above.
 * Throws on startup when required variables are missing or malformed,
 * so the app fails fast instead of crashing later at runtime.
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Invalid environment configuration:\n${errors
        .map((error) => Object.values(error.constraints ?? {}).join(', '))
        .join('\n')}`,
    );
  }

  return validatedConfig;
}
