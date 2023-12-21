import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutTodoAction, getTodosAction } from "../todos/todoSlice";
import axios from "axios";
import "../../../utils/axiosConfig";
import apis from "../../../utils/apis";

const initialState = {
  loading: false,
  error: null,
  user: {},
};

//login action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(apis.userApis.login, {
        username,
        password,
      });
      await dispatch(getTodosAction());
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
      dispatch(logoutTodoAction());
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
      return resp.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
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
      state.error = action.payload;
    });
  },
});

const usersReducer = usersSlice.reducer;

export default usersReducer;
