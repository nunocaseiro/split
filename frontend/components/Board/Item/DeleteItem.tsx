import React from "react";
import useBoard from "../../../hooks/useBoard";
import BoardAlertDialog from "../BoardAlertDialog";

interface DeleteProps {
  type: string;
  itemId: string;
  cardId: string;
  cardItemId?: string;
  boardId: string;
  socketId: string | undefined;
}

const DeleteItem = React.memo<DeleteProps>(
  ({ type, itemId, socketId, boardId, cardId, cardItemId }) => {
    const { deleteCard, deleteComment } = useBoard({
      autoFetchBoard: false,
      autoFetchBoards: false,
    });

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      if (type === "CARD") {
        deleteCard.mutate({
          cardId: itemId,
          boardId,
          socketId,
        });
      }
      if (type === "COMMENT") {
        deleteComment.mutate({
          cardId,
          cardItemId,
          boardId,
          socketId,
          commentId: itemId,
          isCardGroup: cardItemId === undefined,
        });
      }
    };

    return (
      <BoardAlertDialog
        defaultOpen={false}
        text={`Are you sure you want to delete this ${type.toLowerCase()}?`}
        handleClose={(e) => e.stopPropagation()}
        handleConfirm={handleDelete}
      />
    );
  }
);

export default DeleteItem;
