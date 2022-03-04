import { IsMongoId, IsString } from 'class-validator';
import { CardItemParams } from './card.item.params';

export class VoteItemParams extends CardItemParams {
  @IsMongoId()
  @IsString()
  userId!: string;
}
