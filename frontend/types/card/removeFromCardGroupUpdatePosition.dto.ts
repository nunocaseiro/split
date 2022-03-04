export default interface RemoveFromMergeUpdatePositionDto {
  columnId: string;

  cardId: string;

  boardId: string;

  cardGroupId: string;

  socketId: string;

  newPosition: number;
}
