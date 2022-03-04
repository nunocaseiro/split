import React, { useEffect, useState, useRef } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { DropResult, ResponderProvided, DragDropContext } from "react-beautiful-dnd";
import nProgress from "nprogress";
import requireAuthentication from "../../components/HOC/requireAuthentication";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Text from "../../components/Primitives/Text";
import { styled } from "../../stitches.config";
import {
  ADD_CARD_INTO_CARD_GROUP,
  NEXT_PUBLIC_BACKEND_URL,
  UPDATE_CARD_POSITION,
} from "../../utils/constants";
import Column from "../../components/Board/Column";
import Flex from "../../components/Primitives/Flex";
import BoardType from "../../types/board/board";
import UpdateCardPositionDto from "../../types/card/updateCardPosition.dto";
import ColumnType from "../../types/column";
import useBoard from "../../hooks/useBoard";
import MergeCardsDto from "../../types/board/mergeCard.dto";
import Action from "../../types/board/boardAction";
import {
  setBoard,
  setNewCardPosition,
  setMergeCard,
  clearBoard,
  setChangesBoard,
} from "../../store/slicer/boardSlicer";
import BoardAlertDialog from "../../components/Board/BoardAlertDialog";
import { getBoardRequest } from "../../api/boardService";

const Container = styled(Flex, {
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "$8",
  height: "100%",
});

const ContainerSideBar = styled("div", {
  position: "absolute",
  top: "4%",
  right: 0,
  zIndex: 100,
});

export const getServerSideProps: GetServerSideProps = requireAuthentication(async (context) => {
  const { boardId } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["board", { id: boardId }], () =>
    getBoardRequest(boardId as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

const ColumnList: React.FC<{
  columns: ColumnType[];
  boardId: string;
  userId: string;
  socketId: string;
}> = ({ columns, boardId, userId, socketId }) => {
  return (
    <>
      {columns.map((column, index) => {
        return (
          <Column
            key={column._id}
            cards={column.cards}
            columnId={column._id}
            index={index}
            userId={userId}
            boardId={boardId}
            title={column.title}
            color={column.color}
            socketId={socketId}
          />
        );
      })}
    </>
  );
};

const Board: React.FC = () => {
  const { query } = useRouter();
  const boardId = query.boardId as string;
  const { data: session } = useSession({ required: true });
  const userId = session?.user?.id;

  const socketClient = useRef<Socket>();
  const socketId = socketClient.current?.id ?? undefined;
  const [action, setAction] = useState<Action>();
  const { updateCardPosition, fetchBoard, mergeCards } = useBoard({
    autoFetchBoard: true,
    autoFetchBoards: false,
  });
  const { data } = fetchBoard;
  const board = useAppSelector((state) => state.board.value);
  const actualVotes = useAppSelector((state) => state.board.votes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data && !board) {
      dispatch(setBoard({ board: data, userId }));
    }
  }, [board, data, dispatch, userId]);

  useEffect(() => {
    const newSocket: Socket = io(NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:3200");

    newSocket.on("connect", () => {
      newSocket.emit("join", { boardId });
    });

    newSocket.on("updateAllBoard", (payload: BoardType) => {
      dispatch(setChangesBoard({ board: payload }));
    });
    socketClient.current = newSocket;
  }, [boardId, dispatch]);

  useEffect(
    () => () => {
      if (socketClient.current) socketClient.current?.close();
      socketClient.current = undefined;
      dispatch(clearBoard());
    },
    [dispatch]
  );

  useEffect(() => {
    if (!data || !board) nProgress.start();
  }, [board, data]);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const message = result.destination
      ? `You have moved the card from position ${result.source.index + 1} to ${
          result.destination.index + 1
        }`
      : `The card has been returned to its starting position of ${result.source.index + 1}`;

    provided.announce(message);

    if (!board?._id || !socketId || !result) return;
    const { destination, source, combine, draggableId } = result;

    if (!source) return;

    if (!combine && !destination) {
      return;
    }

    const { droppableId: sourceDroppableId, index: sourceIndex } = source;

    if (combine && userId) {
      const { droppableId: combineDroppableId, draggableId: combineDraggableId } = combine;

      const changes: MergeCardsDto = {
        columnIdOfCard: sourceDroppableId,
        colIdOfCardGroup: combineDroppableId,
        cardId: draggableId,
        boardId: board._id,
        cardGroupId: combineDraggableId,
        socketId,
        userId,
        cardPosition: sourceIndex,
      };
      const newAction = { type: ADD_CARD_INTO_CARD_GROUP, changes };
      setAction(newAction);
      dispatch(setMergeCard(draggableId));
    }

    if (!combine && destination) {
      const { droppableId: destinationDroppableId, index: destinationIndex } = destination;

      if (
        !combine &&
        destinationDroppableId === sourceDroppableId &&
        destinationIndex === sourceIndex
      ) {
        return;
      }
      const changes: UpdateCardPositionDto = {
        colIdOfCard: source.droppableId,
        targetColumnId: destinationDroppableId,
        newPosition: destinationIndex,
        cardPosition: sourceIndex,
        cardId: draggableId,
        boardId: board._id,
        socketId,
      };
      const newAction = { type: UPDATE_CARD_POSITION, changes };
      dispatch(setNewCardPosition(newAction));
      updateCardPosition.mutate(changes);
    }
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setAction(undefined);
    dispatch(setMergeCard(undefined));
  };
  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (action) {
      mergeCards.mutate(action.changes as MergeCardsDto);
      setAction(undefined);
    }
  };

  if (board && userId && socketId) {
    nProgress.done();
    if (!board.isPublic) {
      return <Text>Locked</Text>;
    }
    return (
      <Container>
        <div>{actualVotes}</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <ColumnList
            columns={board.columns}
            boardId={boardId}
            userId={userId}
            socketId={socketId}
          />
        </DragDropContext>
        {action && action.type === ADD_CARD_INTO_CARD_GROUP && (
          <BoardAlertDialog
            defaultOpen
            text="Do you want to merge this card?"
            handleClose={handleCloseAlert}
            handleConfirm={handleConfirm}
          />
        )}
        <ContainerSideBar
          id="sidebar"
          css={{
            height: document.body.clientHeight,
          }}
        />
      </Container>
    );
  }
  return null;
};

export default Board;
