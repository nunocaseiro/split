import React from "react";
import { styled } from "../../../stitches.config";
import Text from "../../Primitives/Text";
import Card from "../../Primitives/Card";
import BoardAlertDialog from "../BoardAlertDialog";
import useBoard from "../../../hooks/useBoard";

const Container = styled(Card, {
  p: "$8",
  wordBreak: "breakWord",
  cursor: "grab",
  borderRadius: "$6",
  justifyContent: "space-between",
  alignItems: "center",
  mt: "$4",
  boxShadow: "1px 2px 10px rgba(0, 0, 0, 0.2)",
});

interface CardBoardPreviewProps {
  text: string;
  position: number;
  boardId: string;
  cardId: string;
  colId: string;
  socketId: string;
  cardGroupId: string;
}

const CardBoardPreview = React.memo<CardBoardPreviewProps>(
  ({ text, position, boardId, cardGroupId, cardId, colId, socketId }) => {
    const { removeFromMergeCard } = useBoard({ autoFetchBoard: false, autoFetchBoards: false });

    const handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
    };

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      removeFromMergeCard.mutate({
        columnId: colId,
        cardGroupId,
        cardId,
        newPosition: position,
        boardId,
        socketId,
      });
    };

    return (
      <Container aria-roledescription="Press space bar to lift the task">
        <Text>{text}</Text>
        <BoardAlertDialog
          defaultOpen={false}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          text="Do you want to unmerge this card?"
        />
      </Container>
    );
  }
);

export default CardBoardPreview;
