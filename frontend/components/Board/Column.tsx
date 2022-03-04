import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "../../stitches.config";
import { ColumnBoardType, ColumnInnerList } from "../../types/column";
import Flex from "../Primitives/Flex";
import Text from "../Primitives/Text";
import CardBoard from "./Card/CardBoard";
import CardType from "../../types/card/card";
import AddCard from "./Card/AddCard";

const Container = styled(Flex, {
  borderRadius: "$8",
  height: "fit-content",
  flexShrink: 0,
  flex: "1",
  pb: "$40",
  px: "$24",
  width: "100%",
});

const Title = styled(Text, {
  px: "$8",
});

const InnerList = React.memo<ColumnInnerList>(
  ({ cards, color, colId, userId, boardId, socketId }) => {
    return (
      <>
        {cards.map((card: CardType, idx) => {
          return (
            <CardBoard
              key={card._id}
              card={card}
              index={idx}
              isPreview={false}
              color={color}
              colId={colId}
              userId={userId}
              boardId={boardId}
              socketId={socketId}
            />
          );
        })}
      </>
    );
  }
);

const Column = React.memo<ColumnBoardType>(
  ({ columnId, cards, index, userId, boardId, title, color, socketId }) => {
    console.log("COLUMN");
    return (
      <Flex
        css={{
          height: "fit-content",
          flex: "1",
          flexGrow: 1,
          flexShrink: 0,
          width: "100%",
        }}
      >
        <Droppable droppableId={columnId} type="CARD" isCombineEnabled>
          {(provided) => (
            <Container direction="column" css={{ backgroundColor: color }}>
              <Title size="18" fontWeight="bold">
                {title}
              </Title>
              <AddCard colIdx={index} />
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <InnerList
                  cards={cards}
                  color={color}
                  colId={columnId}
                  userId={userId}
                  boardId={boardId}
                  socketId={socketId}
                />
                {provided.placeholder}
              </div>
            </Container>
          )}
        </Droppable>
      </Flex>
    );
  }
);
export default Column;
