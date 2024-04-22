import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

// Du lieu ban dau
const initialState = {
  dailyRevenue: null,
  monthlyRevenue: null,
  todayRevenue: null,
  error: null,
  status: "idle",
};

const token = localStorage.getItem("accessToken");

export const getDailyRevenue = createAsyncThunk(
  "revenues/getDailyRevenue",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/revenues/daily`, {
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

export const getMonthlyRevenue = createAsyncThunk(
  "revenues/getMonthlyRevenue",
  async ({ year, month }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/revenues/monthly?year=${year}&month=${month}`,
        null,
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

export const getTodayRevenue = createAsyncThunk(
  "revenues/getTodayRevenue",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/revenues/today`, {
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

const revenueSlice = createSlice({
  name: "revenues",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDailyRevenue.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDailyRevenue.fulfilled, (state, action) => {
        state.status = "done";
        state.dailyRevenue = action.payload; //action.payload ===== response.data
      })
      .addCase(getDailyRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMonthlyRevenue.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMonthlyRevenue.fulfilled, (state, action) => {
        state.status = "done";
        state.monthlyRevenue = action.payload; //action.payload ===== response.data
      })
      .addCase(getMonthlyRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTodayRevenue.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTodayRevenue.fulfilled, (state, action) => {
        state.status = "done";
        state.todayRevenue = action.payload; //action.payload ===== response.data
      })
      .addCase(getTodayRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// tao Reducer: voi moi State se co mot Reducer de
// chiu trach nhiem thay doi cac State day
export const revenueReducer = revenueSlice.reducer;

export const selectTodayRevenue = (state) => state.revenueReducer.todayRevenue;

export const selectMonthRevenue = (state) =>
  state.revenueReducer.monthlyRevenue;

export default revenueReducer;
