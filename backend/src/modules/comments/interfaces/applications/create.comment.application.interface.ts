import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface CreateCommentApplication {
  createCardItemComment(
    boardId: string,
    cardId: string,
    itemId: string,
    userId: string,
    text: string,
  ): QueryBoardDocument;
  createCardGroupComment(
    boardId: string,
    cardId: string,
    userId: string,
    text: string,
  ): QueryBoardDocument;
}
