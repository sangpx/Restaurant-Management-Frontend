import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

// Du lieu ban dau
const initialState = {
  listFoods: [],
  food: {},
  error: null,
  status: "idle",
};

const token = localStorage.getItem("accessToken");

export const getAlls = createAsyncThunk("foods/getAlls", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foods/getAlls`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createFood = createAsyncThunk(
  "foods/createFood",
  async ({ categoryId, newFood }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/foods/createFood?categoryId=${categoryId}`,
        newFood,
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

export const updateFood = createAsyncThunk(
  "foods/updateFood",
  async ({ categoryId, id, newFood }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/foods/updateFood/${id}?categoryId=${categoryId}`,
        newFood,
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

export const detailFood = createAsyncThunk(
  "foods/getDetailFood",
  async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/foods/getDetailFood/${id}`,
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

export const deleteFood = createAsyncThunk(
  "foods/deleteFood",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/foods/deleteFood/${id}`,
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

const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAlls.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAlls.fulfilled, (state, action) => {
        state.status = "done";
        state.listFoods = action.payload; //action.payload ===== response.data
      })
      .addCase(getAlls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(detailFood.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(detailFood.fulfilled, (state, action) => {
        state.status = "done";
        state.food = action.payload;
      })
      .addCase(detailFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.status = "done";
        state.listFoods.push(action.payload); //action.payload ===== response.data
      })
      .addCase(createFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.status = "done";
        const updatedFood = action.payload;
        const index = state.listFoods.findIndex(
          (food) => food.id === updatedFood.id
        );
        if (index !== -1) {
          state.listFoods[index] = updatedFood; 
        }
      })
      .addCase(deleteFood.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.status = "done";
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// tao Reducer: voi moi State se co mot Reducer de
// chiu trach nhiem thay doi cac State day
export const foodReducer = foodSlice.reducer;

//selector
export const selectAllFoods = (state) => state.foodReducer.listFoods;
export const selectFood = (state) => state.foodReducer.food;

export default foodReducer;
