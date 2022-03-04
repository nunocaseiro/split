import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface DeleteCommentApplication {
  deleteCardItemComment(
    boardId: string,
    commentId: string,
    userId: string,
  ): QueryBoardDocument;
  deleteCardGroupComment(
    boardId: string,
    commentId: string,
    userId: string,
  ): QueryBoardDocument;
}
