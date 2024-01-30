import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apis from "../../../utils/apis";

const initialState = {
  hideCompleted: false,
  loading: false,
  error: null,
  todos: [],
  todoGroup: null,
  todoGroups: [],
};

//get todos
export const getTodosAction = createAsyncThunk(
  "todos/getTodos",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const params = {};
      if (getState()?.todos?.hideCompleted === true) {
        params.hideCompleted = true;
      }
      const resp = await axios.get(
        `${apis.todoApis.todos}/${payload.groupId}`,
        { params }
      );
      return resp.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//add
export const addTodoAction = createAsyncThunk(
  "todos/add",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const groupId = payload.groupId;
      const res = await axios.post(`${apis.todoApis.todos}/${groupId}/add`, {
        text: payload.text,
      });
      await dispatch(getTodosAction({ groupId }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//edit
export const editTodoAction = createAsyncThunk(
  "todos/edit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.put(`${apis.todoApis.todos}/${payload.id}/edit`, {
        text: payload.newText,
      });
      await dispatch(getTodosAction({ groupId: payload.groupId }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete
export const deleteTodoAction = createAsyncThunk(
  "todos/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.delete(
        `${apis.todoApis.todos}/${payload.id}/delete`
      );
      await dispatch(getTodosAction({ groupId: payload.groupId }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//done
export const doneTodoAction = createAsyncThunk(
  "todos/done",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.put(
        `${apis.todoApis.todos}/${payload.id}/done/${payload.done}`
      );
      await dispatch(getTodosAction({ groupId: payload.groupId }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get todo groups
export const getTodoGroupsAction = createAsyncThunk(
  "todos/getTodoGroups",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const resp = await axios.get(apis.todoApis.todoGroups);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//add group
export const addTodoGroupAction = createAsyncThunk(
  "todos/addTodoGroup",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(`${apis.todoApis.todoGroups}/add`, {
        name: "",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  //sync
  reducers: {
    //clean up todos arrays
    cleanTodoAction: (state, action) => {
      state.todos = [];
      state.todoGroup = null;
      state.todoGroups = [];
    },
    //change todos on input onChange event
    onChangeTodosAction: (state, action) => {
      state.todos = state.todos.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, text: action.payload.newText, changed: true };
        }
        return obj;
      });
    },
    onChangeHideCompletedAction: (state, action) => {
      state.hideCompleted = action.payload.hideCompleted;
    },
    onChangeTodoGroupAction: (state, action) => {
      console.log(action.payload);
      state.todoGroup = state.todoGroups[action.payload];
    },
  },
  //async
  extraReducers: (builder) => {
    //getTodos
    builder.addCase(getTodosAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTodosAction.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(getTodosAction.rejected, (state, action) => {
      state.todos = [];
      state.loading = false;
      state.error = action.payload;
    });
    //add
    builder.addCase(addTodoAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTodoAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addTodoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //edit
    builder.addCase(editTodoAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editTodoAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editTodoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //delete
    builder.addCase(deleteTodoAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTodoAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTodoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //done
    builder.addCase(doneTodoAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(doneTodoAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(doneTodoAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //getTodoGroups
    builder.addCase(getTodoGroupsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTodoGroupsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.todoGroups = action.payload;
      state.todoGroup = action.payload[0] || null;
    });
    builder.addCase(getTodoGroupsAction.rejected, (state, action) => {
      state.todoGroups = [];
      state.loading = false;
      state.todoGroup = null;
      state.error = action.payload;
    });
    //addTodoGroup
    builder.addCase(addTodoGroupAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTodoGroupAction.fulfilled, (state, action) => {
      state.loading = false;
      state.todoGroup = action.payload;
    });
    builder.addCase(addTodoGroupAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.todoGroup = null;
    });
  },
});

const todosReducer = todosSlice.reducer;

export const {
  cleanTodoAction,
  onChangeTodosAction,
  onChangeHideCompletedAction,
  onChangeTodoGroupAction,
} = todosSlice.actions;

export default todosReducer;
