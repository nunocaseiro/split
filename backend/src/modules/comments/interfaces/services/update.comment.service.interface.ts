import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface UpdateCommentService {
  updateCardItemComment(
    boardId: string,
    cardId: string,
    cardItemId: string,
    commentId: string,
    userId: string,
    text: string,
  ): QueryBoardDocument;
  updateCardGroupComment(
    boardId: string,
    cardId: string,
    commentId: string,
    userId: string,
    text: string,
  ): QueryBoardDocument;
}
