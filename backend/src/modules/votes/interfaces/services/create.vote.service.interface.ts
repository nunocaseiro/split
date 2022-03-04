import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface CreateVoteService {
  addVoteToCard(
    boardId: string,
    cardId: string,
    userId: string,
    cardItemId: string,
  ): QueryBoardDocument;
  addVoteToCardGroup(
    boardId: string,
    cardId: string,
    userId: string,
  ): QueryBoardDocument;
}
