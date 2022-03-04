import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../../libs/dto/base.dto';
import CardDto from './card.dto';

export class CreateCardDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  colIdToAdd!: string;

  @IsNotEmpty()
  @Type(() => CardDto)
  card!: CardDto;
}
