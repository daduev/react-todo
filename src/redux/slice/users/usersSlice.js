import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cleanTodoAction, getTodoGroupsAction } from "../todos/todoSlice";
import axios from "axios";
import apis from "../../../utils/apis";

const initialState = {
  loading: false,
  error: null,
  user: {},
};

//registration action
export const signupUserAction = createAsyncThunk(
  "user/signup",
  async ({ username, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(apis.userApis.signup, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(apis.userApis.login, {
        username,
        password,
      });
      await dispatch(getTodoGroupsAction());
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutUserAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(apis.userApis.logout);
      dispatch(cleanTodoAction());
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user
export const getCurrentUserAction = createAsyncThunk(
  "user/getCurrentUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const resp = await axios.get(apis.userApis.currentUser);
      await dispatch(getTodoGroupsAction());
      return resp.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //clean up user
    cleanUserAction: (state, action) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    //signup
    builder.addCase(signupUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signupUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {};
    });
    builder.addCase(signupUserAction.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });
    //logout
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {};
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });
    //getCurrentUser
    builder.addCase(getCurrentUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getCurrentUserAction.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });
  },
});

const usersReducer = usersSlice.reducer;

export const { cleanUserAction } = usersSlice.actions;

export default usersReducer;
