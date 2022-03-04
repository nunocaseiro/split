import { ClientSession, Model } from 'mongoose';
import { UPDATE_FAILED } from '../../../libs/exceptions/messages';
import { BoardDocument } from '../../boards/schemas/board.schema';

export const pullCard = async (
  boardId: string,
  cardId: string,
  boardModel: Model<BoardDocument>,
  session?: ClientSession,
) => {
  const pullResult = await boardModel
    .updateOne(
      {
        _id: boardId,
        'columns.cards._id': cardId,
      },
      {
        $pull: {
          'columns.$[].cards': { _id: cardId },
        },
      },
      { session },
    )
    .lean()
    .exec();
  if (pullResult.modifiedCount !== 1) {
    throw new Error(UPDATE_FAILED);
  }
};

export const pullItem = async (
  boardId: string,
  itemId: string,
  boardModel: Model<BoardDocument>,
  session?: ClientSession,
) => {
  const pullResult = await boardModel
    .updateOne(
      {
        _id: boardId,
        'columns.cards.items._id': itemId,
      },
      {
        $pull: {
          'columns.$[].cards.$[].items': { _id: itemId },
        },
      },
      { new: true, session },
    )
    .lean()
    .exec();
  if (pullResult.modifiedCount !== 1) {
    throw new Error(UPDATE_FAILED);
  }
};
