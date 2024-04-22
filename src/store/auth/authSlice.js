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
  listRoles: [],
  user: {},
  error: null,
  userInfo: {},
  userToken,
  status: "idle",
  loading: false,
  message: {},
  isAuthenticated: false,
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

export const createUser = createAsyncThunk("users/signup", async (newUser) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

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

export const getAllRoles = createAsyncThunk("users/getAllRoles", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles/getRoles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, newUser }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/updateUser/${id}`,
        newUser,
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

export const detailUser = createAsyncThunk(
  "users/getDetailUser",
  async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/getDetailUser/${id}`,
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

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      state.isAuthenticated = false;
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
      .addCase(getAllRoles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.status = "done";
        state.listRoles = action.payload; //action.payload ===== response.data
      })
      .addCase(getAllRoles.rejected, (state, action) => {
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
        state.userToken = action.payload.accessToken; //action.payload ===== response.data
        state.isAuthenticated = true;
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
        state.listUsers.push(action.payload);
        state.message = action.payload; //action.payload ===== response.data
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "done";
        const updatedUser = action.payload;
        const index = state.listUsers.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.listUsers[index] = updatedUser;
        }
      })
      .addCase(detailUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(detailUser.fulfilled, (state, action) => {
        state.status = "done";
        state.user = action.payload;
      })
      .addCase(detailUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "done";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const userReducer = authSlice.reducer;

//selector
export const selectAllUsers = (state) => state.userReducer.listUsers;
export const selectUser = (state) => state.userReducer.user;
export const selectAllRoles = (state) => state.userReducer.listRoles;
export const isAuthenticated = (state) => state.userReducer.isAuthenticated;

export default userReducer;
