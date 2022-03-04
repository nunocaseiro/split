import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface CreateVoteApplication {
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
