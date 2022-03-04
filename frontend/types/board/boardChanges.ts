import AddCardDto from "../card/addCard.dto";
import RemoveFromMergeUpdatePositionDto from "../card/removeFromCardGroupUpdatePosition.dto";
import UpdateCardPositionDto from "../card/updateCardPosition.dto";
import MergeCardsDto from "./mergeCard.dto";

type BoardChanges =
  | UpdateCardPositionDto
  | MergeCardsDto
  | RemoveFromMergeUpdatePositionDto
  | AddCardDto;

export default BoardChanges;
