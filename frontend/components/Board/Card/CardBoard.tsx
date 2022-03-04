import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "../../../stitches.config";
import Card from "../../Primitives/Card";
import CardType from "../../../types/card/card";
import Flex from "../../Primitives/Flex";
import DeleteItem from "../Item/DeleteItem";
import useBoard from "../../../hooks/useBoard";
import ToastMessage from "../../../utils/toast";
import EditItem from "../Item/EditItem";
import UpdateItem from "../Item/UpdateItem";
import TextItem from "../Item/TextItem";
import SideBard from "./SideBar";
import CardFooter from "./CardFooter";
import { CardItemType } from "../../../types/card/cardItem";
import CardBoardPreview from "./CardBoardPreview";
import { useAppSelector } from "../../../store/hooks";

const Container = styled(Card, {
  borderRadius: "$2",
  p: "$8",
  mt: "$16",
  wordBreak: "breakWord",
});

interface CardBoardProps {
  color: string;
  card: CardType;
  index: number;
  colId: string;
  isPreview: boolean;
  userId: string;
  boardId: string;
  socketId: string;
}

interface CardInnerListProps {
  items: CardItemType[];
  colId: string;
  userId: string;
  color: string;
  socketId: string;
  boardId: string;
  index: number;
  cardId: string;
}
const CardsList = React.memo<CardInnerListProps>(
  ({ cardId, items, boardId, colId, socketId, index }) => {
    return (
      <>
        {items.map((cardItem: CardItemType) => {
          return (
            <CardBoardPreview
              key={cardItem._id}
              text={cardItem.text}
              position={index}
              boardId={boardId}
              cardId={cardItem._id}
              colId={colId}
              socketId={socketId}
              cardGroupId={cardId}
            />
          );
        })}
      </>
    );
  }
);

const CardBoard = React.memo<CardBoardProps>(
  ({ card, index, color, colId, isPreview, userId, boardId, socketId }) => {
    const isCardGroup = card.items.length > 1;
    const { updateCard } = useBoard({ autoFetchBoard: false, autoFetchBoards: false });
    const mergingCardId = useAppSelector((state) => state.board.mergingCardId);
    const [editText, setEditText] = useState(false);
    const [newText, setNewText] = useState(card.text);
    const [show, setShow] = useState(false);
    const handleOpenSideBar = () => {
      if (!editText) setShow(true);
    };
    const handleUpdateCardText = () => {
      if (newText?.length > 0 && boardId) {
        updateCard.mutate({
          boardId,
          cardItemId: card.items[0]._id,
          cardId: card._id,
          text: newText,
          socketId,
          isCardGroup,
        });
        setEditText(false);
      } else {
        ToastMessage("Card text cannot be empty!", "error");
      }
    };
    return (
      <Draggable key={card._id} draggableId={card._id} index={index}>
        {(provided) => (
          <Container
            direction="column"
            css={{
              cursor: "grab",
              borderRadius: "$6",
              boxShadow: "1px 2px 10px rgba(0, 0, 0, 0.2)",
              display: mergingCardId === card._id ? "none" : "flex",
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            onClick={handleOpenSideBar}
            ref={provided.innerRef}
          >
            {!editText && !isPreview && card.createdBy === userId && (
              <Flex justify="end" gap="4">
                <EditItem editText={editText} setEditText={setEditText} />
                <DeleteItem
                  itemId={card._id}
                  type="CARD"
                  socketId={socketId}
                  boardId={boardId}
                  cardId={card._id}
                  cardItemId={card.items[0]._id}
                />
              </Flex>
            )}
            {!isPreview && (
              <TextItem
                editText={editText}
                newText={newText}
                setNewText={setNewText}
                text={card.text}
              />
            )}
            {editText && <UpdateItem handleUpdate={handleUpdateCardText} />}
            {!editText && card.items && card.items.length > 1 && (
              <CardsList
                items={card.items}
                color={color}
                colId={colId}
                userId={userId}
                socketId={socketId}
                boardId={boardId}
                index={index}
                cardId={card._id}
              />
            )}
            {!editText && !isPreview && (
              <CardFooter boardId={boardId} socketId={socketId} userId={userId} card={card} />
            )}
            {!isPreview && (
              <SideBard
                show={show}
                setShow={setShow}
                card={card}
                color={color}
                userId={userId}
                boardId={boardId}
                socketId={socketId}
              />
            )}
          </Container>
        )}
      </Draggable>
    );
  }
);

export default CardBoard;
