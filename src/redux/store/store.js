import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/usersSlice";
import todosReducer from "../slice/todos/todoSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todosReducer,
  },
});

export default store;
