import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export type Todo = {
  title: string;
  done?: boolean;
  id: number;
};

const todos: Todo[] = [];

const todosSlice = createSlice({
  initialState: todos,
  name: "todo",
  reducers: {
    add: (state, { payload }: PayloadAction<Todo>) => {
      return [payload, ...state];
    },
    remove: (state, { payload }: PayloadAction<Todo>) => {
      state = state.filter((item) => item.id !== payload?.id);
      return state;
    },
    done: (state, { payload }: PayloadAction<Todo>) => {
      const newState = state.map((i) =>
        i.id === payload.id ? { ...i, done: true } : i
      );
      return newState;
    },
    edit: (state, { payload }: PayloadAction<Todo>) => {
      const newState = state.map((i) => (i.id === payload.id ? payload : i));
      return newState;
    },
  },
});

export const actions = todosSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export const reducer = todosSlice.reducer;
