import React, { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon, Cross1Icon } from "@modulz/radix-icons";
import { styled } from "../../stitches.config";
import Text from "../Primitives/Text";
import {
  DialogContent,
  DialogRoot,
  DialogCloseButton,
  DialogContentTitle,
  DialogTrigger,
} from "../Primitives/Dialog";
import Input from "../Primitives/Input";
import Flex from "../Primitives/Flex";
import Button from "../Primitives/Button";
import useBoard from "../../hooks/useBoard";
import BoardType from "../../types/board/board";
import SchemaCreateBoard from "../../schema/schemaCreateBoardForm";
import isEmpty from "../../utils/isEmpty";

const PlusIcon = styled(PlusCircledIcon, {
  size: "$40",
  mt: "$20",
  color: "$gray9",
});

const FooterContainer = styled(Flex);

const CreateBoardModal: React.FC<{
  setFetchLoading: (state: boolean) => void;
}> = ({ setFetchLoading }) => {
  const { createBoard } = useBoard({ autoFetchBoard: false, autoFetchBoards: false });
  const { isLoading, isError } = createBoard;

  const methods = useForm<BoardType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(SchemaCreateBoard),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const title = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    setFetchLoading(isLoading);
  }, [isError, isLoading, setFetchLoading]);

  const handleClick = (data: BoardType) => {
    createBoard.mutate({
      title: data.title,
      columns: [
        { title: "todo", color: "#CDE9D6", cards: [] },
        { title: "progress", color: "#F8E8CF", cards: [] },
        { title: "actions", color: "#D2E8FD", cards: [] },
      ],
      isPublic: true,
      maxVotes: 6,
    });
  };

  return (
    <DialogRoot>
      <DialogTrigger
        interactive="clickable"
        align="center"
        radius="40"
        justify="center"
        direction="column"
      >
        <Text>Add retro board</Text>
        <PlusIcon />
      </DialogTrigger>
      <DialogContent
        direction="column"
        justify="center"
        css={{ width: "30vw" }}
        aria-label="Create retro board"
        aria-describedby="create-board-modal"
      >
        <DialogContentTitle>New board</DialogContentTitle>
        <form onSubmit={handleSubmit(handleClick)}>
          <FormProvider {...methods}>
            <Input
              id="boardName"
              type="text"
              value={title ?? ""}
              state={errors.title ? "error" : isEmpty(title) ? "default" : "valid"}
              placeholder="Board name"
              helperText={errors.title?.message}
            />
            <FooterContainer justify="center">
              <Button type="submit" color="blue" css={{ width: "20%", mt: "$26" }}>
                Save
              </Button>
            </FooterContainer>
          </FormProvider>
        </form>
        <DialogCloseButton asChild>
          <Button>
            <Cross1Icon />
          </Button>
        </DialogCloseButton>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateBoardModal;
