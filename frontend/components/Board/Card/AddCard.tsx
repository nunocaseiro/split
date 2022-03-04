import { Cross2Icon, CheckIcon } from "@modulz/radix-icons";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { CardToAdd } from "../../../types/card/card";
import Button from "../../Primitives/Button";
import Flex from "../../Primitives/Flex";
import useBoard from "../../../hooks/useBoard";
import AddCardDto from "../../../types/card/addCard.dto";
import { useAppSelector } from "../../../store/hooks";
import TextArea from "../../Primitives/TextArea";
import isEmpty from "../../../utils/isEmpty";
import SchemaTextForm from "../../../schema/schamaTextForm";

const ActionButton = styled(Button, { borderRadius: "$round" });

const StyledCrossIcon = styled(Cross2Icon, { size: "$20" });
const StyledCheckIcon = styled(CheckIcon, { size: "$20" });

interface AddCardProps {
  colIdx: number;
}

const AddCard = React.memo<AddCardProps>(({ colIdx }) => {
  const board = useAppSelector((state) => state.board.value);

  const { addCardInColumn } = useBoard({ autoFetchBoard: false, autoFetchBoards: false });

  const [isClicked, setIsClicked] = useState(false);

  const methods = useForm<{ text: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(SchemaTextForm),
  });

  const {
    formState: { errors },
    control,
    setValue,
  } = methods;

  const text = useWatch({
    control,
    name: "text",
  });

  const handleDisableEdit = () => {
    methods.clearErrors();
    setValue("text", "");
    setIsClicked(false);
  };

  const handleAddCard = () => {
    if (board?._id) {
      const newCard: CardToAdd = {
        items: [
          {
            text,
            votes: [],
            comments: [],
          },
        ],
        text,
        votes: [],
        comments: [],
      };
      const changes: AddCardDto = {
        colIdToAdd: board?.columns[colIdx]._id ?? "0",
        boardId: board._id,
        card: newCard,
        socketId: "2",
      };

      addCardInColumn.mutate(changes);
    }
    handleDisableEdit();
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      css={{
        width: "100%",
      }}
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsClicked(false);
        }
      }}
      onFocus={() => setIsClicked(true)}
    >
      <FormProvider {...methods}>
        <TextArea
          value={text ?? ""}
          id="text"
          state={errors.text ? "error" : isEmpty(text) ? "default" : "valid"}
          helperText={errors.text?.message}
          placeholder="Add a card..."
        />
        {isClicked && (
          <Flex justify="end" gap="4" css={{ width: "100%" }}>
            <ActionButton size="sm" color="red" onClick={handleDisableEdit}>
              <StyledCrossIcon />
            </ActionButton>
            <ActionButton size="sm" color="green" onClick={handleAddCard}>
              <StyledCheckIcon />
            </ActionButton>
          </Flex>
        )}
      </FormProvider>
    </Flex>
  );
});
export default AddCard;
