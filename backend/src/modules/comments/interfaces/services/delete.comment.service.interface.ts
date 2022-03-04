import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface DeleteCommentService {
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
