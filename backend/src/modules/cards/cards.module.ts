import { Module } from '@nestjs/common';
import { mongooseBoardModule } from '../../infrastructure/database/mongoose.module';
import { getBoardService } from '../boards/boards.providers';
import {
  createCardApplication,
  createCardService,
  deleteCardApplication,
  deleteCardService,
  getCardService,
  mergeCardApplication,
  mergeCardService,
  unmergeCardApplication,
  unmergeCardService,
  updateCardApplication,
  updateCardService,
} from './cards.providers';
import CardsController from './controller/cards.controller';

@Module({
  imports: [mongooseBoardModule],
  controllers: [CardsController],
  providers: [
    createCardService,
    updateCardService,
    getCardService,
    deleteCardService,
    updateCardService,
    createCardApplication,
    updateCardApplication,
    deleteCardApplication,
    getBoardService,
    mergeCardApplication,
    mergeCardService,
    unmergeCardApplication,
    unmergeCardService,
  ],
  exports: [getCardService],
})
export class CardsModule {}
