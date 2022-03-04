import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../../../libs/dto/base.dto';

export class UnmergeUpdatePositionDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  columnId!: string;

  @IsNotEmpty()
  @IsNumber()
  newPosition!: number;
}
