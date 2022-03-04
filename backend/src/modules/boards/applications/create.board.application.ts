import { Inject, Injectable } from '@nestjs/common';
import BoardDto from '../dto/board.dto';
import { CreateBoardApplication } from '../interfaces/applications/create.board.application.interface';
import { CreateBoardService } from '../interfaces/services/create.board.service.interface';
import { TYPES } from '../interfaces/types';

@Injectable()
export class CreateBoardApplicationImpl implements CreateBoardApplication {
  constructor(
    @Inject(TYPES.services.CreateBoardService)
    private createBoardService: CreateBoardService,
  ) {}

  create(board: BoardDto, userId: string) {
    return this.createBoardService.create(board, userId);
  }
}
