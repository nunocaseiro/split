import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UPDATE_FAILED } from '../../../libs/exceptions/messages';
import Board, { BoardDocument } from '../../boards/schemas/board.schema';
import { GetCardService } from '../interfaces/services/get.card.service.interface';
import { UnmergeCardService } from '../interfaces/services/unmerge.card.service.interface';
import { TYPES } from '../interfaces/types';
import { pullItem } from '../shared/pull.card';
import { pushCardIntoPosition } from '../shared/push.card';

export class UnmergeCardServiceImpl implements UnmergeCardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @Inject(TYPES.services.GetCardService)
    private readonly cardService: GetCardService,
  ) {}

  async unmergeAndUpdatePosition(
    boardId: string,
    cardGroupId: string,
    draggedCardId: string,
    columnId: string,
    position: number,
  ) {
    const session = await this.boardModel.db.startSession();
    session.startTransaction();
    try {
      const cardItemToMove = await this.cardService.getCardItemFromGroup(
        boardId,
        draggedCardId,
      );
      console.log(cardItemToMove);

      if (cardItemToMove) {
        await pullItem(boardId, draggedCardId, this.boardModel, session);

        const cardGroup = await this.cardService.getCardFromBoard(
          boardId,
          cardGroupId,
        );
        console.log(cardGroup);
        if (cardGroup) {
          // const groupComments = [...cardGroup.comments];
          // groupComments.forEach((comment) => {
          //   comments.push(comment);
          // });
          // const votes = [...cardGroup.votes];
          // itemVotes.forEach((vote) => votes.push(vote));

          const items = cardGroup.items.filter(
            (item) => item._id.toString() !== draggedCardId,
          );
          if (items.length === 1) {
            const { text, comments, votes: itemVotes } = items[0];
            const newComments = cardGroup.comments.concat(comments);
            const newVotes = (cardGroup.votes as unknown as string[]).concat(
              itemVotes as unknown as string[],
            );
            // console.log(text, newComments, newVotes);
            const updateResult = await this.boardModel
              .updateOne(
                {
                  _id: boardId,
                  'columns.cards._id': cardGroupId,
                },
                {
                  $set: {
                    'columns.$.cards.$[c].text': text,
                    'columns.$.cards.$[c].comments': [],
                    'columns.$.cards.$[c].votes': [],
                    'columns.$.cards.$[c].items.0.comments': newComments,
                    'columns.$.cards.$[c].items.0.votes': newVotes,
                  },
                },
                {
                  arrayFilters: [{ 'c._id': cardGroupId }],
                  session,
                },
              )
              .lean()
              .exec();

            if (updateResult.modifiedCount !== 1) {
              throw Error(UPDATE_FAILED);
            }
          }
        }

        const newCardItem = { ...cardItemToMove };
        delete newCardItem._id;

        const newCard = {
          ...cardItemToMove,
          comments: [],
          votes: [],
          items: [{ ...newCardItem }],
        };

        const pushResult = await pushCardIntoPosition(
          boardId,
          columnId,
          position,
          newCard,
          this.boardModel,
          session,
        );
        await session.commitTransaction();
        return pushResult;
      }
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
    return null;
  }
}
