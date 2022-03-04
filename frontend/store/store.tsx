import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slicer/boardSlicer";

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export default store;

export const actualVotes = () => store.getState().board.votes;
export const maxBoardVotes = () => store.getState().board.value?.maxVotes ?? 0;
export const selectBoard = (state: RootState) => state.board;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
