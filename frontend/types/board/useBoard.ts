import { UseMutationResult, UseQueryResult } from "react-query";
import BoardType, { BoardToAdd } from "./board";
import UpdateBoardDto from "./updateBoard";
import UpdateCardPositionDto from "../card/updateCardPosition.dto";
import AddCardDto from "../card/addCard.dto";
import UpdateCardDto from "../card/updateCard.dto";
import DeleteCardDto from "../card/deleteCard.dto";
import AddCommentDto from "../comment/addComment.dto";
import UpdateCommentDto from "../comment/updateComment.dto";
import DeleteCommentDto from "../comment/deleteComment.dto";
import VoteDto from "../vote/vote.dto";
import MergeCardsDto from "./mergeCard.dto";
import ExchangeCardGroupDto from "../card/exchangeCardGroup.dto";
import RemoveFromMergeUpdatePositionDto from "../card/removeFromCardGroupUpdatePosition.dto";

export default interface UseBoardType {
  createBoard: UseMutationResult<BoardType, unknown, BoardToAdd, unknown>;
  updateBoard: UseMutationResult<BoardType, unknown, UpdateBoardDto, unknown>;
  deleteBoard: UseMutationResult<BoardType, unknown, string, unknown>;
  fetchBoards: UseQueryResult<BoardType[], unknown>;
  fetchBoard: UseQueryResult<BoardType | null, unknown>;
  addCardInColumn: UseMutationResult<BoardType, unknown, AddCardDto, unknown>;
  updateCard: UseMutationResult<BoardType, unknown, UpdateCardDto, unknown>;
  deleteCard: UseMutationResult<BoardType, unknown, DeleteCardDto, unknown>;
  updateCardPosition: UseMutationResult<BoardType, unknown, UpdateCardPositionDto, unknown>;
  addCommentInCard: UseMutationResult<BoardType, unknown, AddCommentDto, unknown>;
  updateComment: UseMutationResult<BoardType, unknown, UpdateCommentDto, unknown>;
  deleteComment: UseMutationResult<BoardType, unknown, DeleteCommentDto, unknown>;
  addVote: UseMutationResult<BoardType, unknown, VoteDto, unknown>;
  deleteVote: UseMutationResult<BoardType, unknown, VoteDto, unknown>;
  mergeCards: UseMutationResult<BoardType, unknown, MergeCardsDto, unknown>;
  exchangeCardOfCardGroup: UseMutationResult<BoardType, unknown, ExchangeCardGroupDto, unknown>;
  removeFromMergeCard: UseMutationResult<
    BoardType,
    unknown,
    RemoveFromMergeUpdatePositionDto,
    unknown
  >;
}
