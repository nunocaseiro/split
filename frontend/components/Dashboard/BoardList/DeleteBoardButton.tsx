import useBoard from "../../../hooks/useBoard";
import { EditBoardTitle } from "../../../types/board/editTitle";
import BoardAlertDialog from "../../Board/BoardAlertDialog";

interface EditTitleWithBoardId extends EditBoardTitle {
  boardId: string;
}

const DeleteBoardButton: React.FC<EditTitleWithBoardId> = ({ boardId, isEditing, onClickEdit }) => {
  const { deleteBoard } = useBoard({ autoFetchBoard: false, autoFetchBoards: false });

  const handleRemoveBoard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (isEditing) onClickEdit(!isEditing);
    deleteBoard.mutate(boardId);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (isEditing) onClickEdit(!isEditing);
  };

  return (
    <BoardAlertDialog
      defaultOpen={false}
      text="Are you sure you want to delete this board?"
      handleClose={handleCloseDialog}
      handleConfirm={handleRemoveBoard}
    />
  );
};

export default DeleteBoardButton;
