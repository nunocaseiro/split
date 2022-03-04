import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';
import CardDto from '../../dto/card.dto';

export interface CreateCardApplication {
  create(
    cardId: string,
    userId: string,
    card: CardDto,
    colIdToAdd: string,
  ): QueryBoardDocument;
}
