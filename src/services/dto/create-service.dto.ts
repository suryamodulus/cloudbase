import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ServiceTypeEnum } from '../constants';

export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @IsEnum(ServiceTypeEnum)
  type: ServiceTypeEnum;

  @IsOptional()
  @IsNotEmpty()
  tag: string = 'latest';

  @IsNotEmpty()
  cpus: string;

  @IsNotEmpty()
  memory: string;

  @IsNotEmpty()
  projectId: string;

  @IsArray()
  @ArrayNotEmpty()
  envVariables: EnvVariableDto[];
}

export class EnvVariableDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: string;
}
