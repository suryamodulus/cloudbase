import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

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
