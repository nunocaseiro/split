import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import CommentDto from '../../comments/dto/comment.dto';

export default class CardItemDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  _id?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value.trim())
  text!: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  createdBy?: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments!: CommentDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  votes!: string[];
}
