import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DATABASE_URL;

  @IsString()
  JWT_SECRET_KEY;

  @IsString()
  REFRESH_TOKEN_KEY;

  @IsString()
  JWT_EXPIRE_LIMIT;

  @IsString()
  JWT_REFRESH_TOKEN_LIMIT;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
