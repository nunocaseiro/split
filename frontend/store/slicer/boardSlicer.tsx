import * as jsonPatch from "fast-json-patch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Action from "../../types/board/boardAction";
import BoardType from "../../types/board/board";
import { Nullable } from "../../types/common";
import countVotes from "../../helper/board/votes";
import { handleUpdateCardPosition } from "../../helper/board/transformBoard";
import UpdateCardPositionDto from "../../types/card/updateCardPosition.dto";

interface BoardState {
  value: Nullable<BoardType>;
  votes: number;
  mergingCardId: Nullable<string>;
}

interface BoardAction {
  board: BoardType;
  userId?: string;
}

const initialState: BoardState = {
  value: undefined,
  mergingCardId: undefined,
  votes: 0,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardAction>) => {
      const { board, userId } = action.payload;
      state.value = board;
      if (userId) state.votes = countVotes(board, userId);
    },
    setChangesBoard: (state, action: PayloadAction<BoardAction>) => {
      const { board, userId } = action.payload;
      if (state.value) {
        const operation = jsonPatch.compare(state.value, board);
        if (operation.length > 0)
          state.value = jsonPatch.applyPatch(state.value, operation).newDocument;
        if (userId) state.votes = countVotes(board, userId);
      }
    },
    clearBoard: (state) => {
      state.value = undefined;
    },
    setMergeCard: (state, action: PayloadAction<Nullable<string>>) => {
      state.mergingCardId = action.payload;
    },
    setNewCardPosition: (state, action: PayloadAction<Action>) => {
      if (state.value) {
        const newBoard = handleUpdateCardPosition(
          state.value,
          action.payload.changes as unknown as UpdateCardPositionDto
        );
        state.value = newBoard;
      }
    },
    setVotes: (state, action: PayloadAction<number>) => {
      state.votes = action.payload;
    },
    incrementVote: (state) => {
      state.votes += 1;
    },
    decrementVote: (state) => {
      state.votes -= 1;
    },
  },
});

export const {
  setBoard,
  clearBoard,
  setNewCardPosition,
  setMergeCard,
  setChangesBoard,
  setVotes,
  incrementVote,
  decrementVote,
} = boardSlice.actions;

export default boardSlice.reducer;
