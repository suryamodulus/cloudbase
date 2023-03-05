import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PAGINATION_CONSTANTS, OrderByEnum } from '../constants/api.constants';

export class ListQueryDefaultDTO {
  @IsOptional()
  searchText?: string = '';

  @IsOptional()
  @IsInt()
  @Min(PAGINATION_CONSTANTS.TAKE)
  @Type(() => Number)
  take?: number = PAGINATION_CONSTANTS.TAKE;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  skip?: number = PAGINATION_CONSTANTS.SKIP;

  // @IsOptional()
  // @IsEnum(OrderByEnum)
  // orderBy?: OrderByEnum = OrderByEnum.NEWEST;
}
