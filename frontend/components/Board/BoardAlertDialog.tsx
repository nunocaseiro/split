import { Cross1Icon } from "@modulz/radix-icons";
import { styled } from "../../stitches.config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../Primitives/AlertDialog";
import Button from "../Primitives/Button";
import Text from "../Primitives/Text";
import Flex from "../Primitives/Flex";

const CloseButton = styled(AlertDialogCancel, Button, {
  position: "relative",
  top: "0",
  left: "0",
  color: "red",
});

const ActionButton = styled(AlertDialogAction, Button, {
  position: "relative",
  top: "0",
  left: "0",
  color: "red",
});

const StyledCrossIcon = styled(Cross1Icon, { size: "$15" });

const BoardAlertDialog: React.FC<{
  text: string;
  defaultOpen: boolean;
  handleConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ text, handleConfirm, handleClose, defaultOpen }) => {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      {!defaultOpen && (
        <AlertDialogTrigger align="center" asChild>
          <Button
            id="delete-item"
            onClick={(event) => event.stopPropagation()}
            css={{ m: 0, p: 2, lineHeight: 0, height: "fit-content", width: "fit-content" }}
          >
            <StyledCrossIcon />
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent
        direction="column"
        onClick={(event) => event.stopPropagation()}
        css={{ width: "$400" }}
      >
        <Text>{text}</Text>
        <Flex justify="end" css={{ mt: "$16" }} gap="20">
          <ActionButton color="red" onClick={handleConfirm}>
            Yes
          </ActionButton>
          <CloseButton color="blue" css={{ position: "relative" }} onClick={handleClose}>
            No
          </CloseButton>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BoardAlertDialog;
