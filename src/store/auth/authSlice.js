import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

// Du lieu ban dau
const initialState = {
  listUsers: [],
  error: null,
  userInfo: {},
  userToken,
  status: "idle",
  loading: false,
  message: {},
};

const token = localStorage.getItem("accessToken");

export const login = createAsyncThunk(
  "users/signin",
  async ({ username, password }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const userData = { username, password }; // Dữ liệu đăng nhập
      const response = await axios.post(
        `${API_BASE_URL}/users/signin`,
        userData,
        config
      );
      const user = response.data;
      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/signup",
  async ({ username, password, phone, email, gender }) => {
    try {
      const userData = { username, password, phone, email, gender }; // Dữ liệu đăng ký
      const response = await axios.post(
        `${API_BASE_URL}/users/signup`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAlls = createAsyncThunk("users/getAlls", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/getAlls`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const logout = () => {
  localStorage.removeItem("accessToken");
  return { type: "users/logout" };
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state, action) {
      state.userToken = null;
      state.userInfo = {};
      state.status = "idle";
      state.listUsers = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAlls.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAlls.fulfilled, (state, action) => {
        state.status = "done";
        state.listUsers = action.payload; //action.payload ===== response.data
      })
      .addCase(getAlls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "done";
        state.loading = false;
        state.userInfo = action.payload;
        console.log("userInfo: ", state.userInfo);
        state.userToken = action.payload.accessToken; //action.payload ===== response.data
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "done";
        state.loading = false;
        state.message = action.payload; //action.payload ===== response.data
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// tao Reducer: voi moi State se co mot Reducer de
// chiu trach nhiem thay doi cac State day
export const userReducer = authSlice.reducer;

//selector
export const selectAllUsers = (state) => state.userReducer.listUsers;

export default userReducer;
