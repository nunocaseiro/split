import { ClientSession, LeanDocument, Model } from 'mongoose';
import { UPDATE_FAILED } from '../../../libs/exceptions/messages';
import { BoardDocument } from '../../boards/schemas/board.schema';
import { CardDocument } from '../schemas/card.schema';

export const pushCardIntoPosition = async (
  boardId: string,
  columnId: string,
  position: number,
  card: LeanDocument<CardDocument>,
  boardModel: Model<BoardDocument>,
  session?: ClientSession,
) => {
  const pushResult = await boardModel
    .findOneAndUpdate(
      {
        _id: boardId,
        'columns._id': columnId,
      },
      {
        $push: {
          'columns.$.cards': {
            $each: [card],
            $position: position,
          },
        },
      },
      { new: true, session },
    )
    .lean();

  if (!pushResult) {
    throw Error(UPDATE_FAILED);
  }
  return pushResult;
};
