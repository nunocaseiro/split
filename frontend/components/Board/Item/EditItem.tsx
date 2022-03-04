import { Pencil1Icon } from "@modulz/radix-icons";
import React, { SetStateAction } from "react";
import { styled } from "../../../stitches.config";
import Button from "../../Primitives/Button";

const StyledPencilIcon = styled(Pencil1Icon, { size: "$15" });

interface EditItemProps {
  editText: boolean;
  setEditText: (value: SetStateAction<boolean>) => void;
}
const EditItem = React.memo<EditItemProps>(({ editText, setEditText }) => {
  const handleEditText = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setEditText(!editText);
  };

  return (
    <Button
      css={{ m: 0, p: 2, lineHeight: 0, height: "fit-content" }}
      onClick={handleEditText}
      isIcon
    >
      <StyledPencilIcon />
    </Button>
  );
});

export default EditItem;
