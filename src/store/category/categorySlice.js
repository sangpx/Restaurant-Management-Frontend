import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

// Du lieu ban dau
const initialState = {
  listCategories: [],
  category: {},
  error: null,
  status: "idle",
};

const token = localStorage.getItem("accessToken");

export const getAlls = createAsyncThunk("categories/getAlls", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/getAlls`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/categories/createCategory`,
        newCategory,
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

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, newCategory }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/categories/updateCategory/${id}`,
        newCategory,
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

export const detailCategory = createAsyncThunk(
  "categories/getDetailCategory",
  async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/categories/getDetailCategory/${id}`,
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/categories/deleteCategory/${id}`,
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

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAlls.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAlls.fulfilled, (state, action) => {
        state.status = "done";
        state.listCategories = action.payload; //action.payload ===== response.data
      })
      .addCase(getAlls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(detailCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(detailCategory.fulfilled, (state, action) => {
        state.status = "done";
        state.category = action.payload;
      })
      .addCase(detailCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "done";
        state.listCategories.push(action.payload); //action.payload ===== response.data
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "done";
        const updatedCategory = action.payload;
        const index = state.listCategories.findIndex(
          (category) => category.id === updatedCategory.id
        );
        if (index !== -1) {
          state.listCategories[index] = updatedCategory; // Update the category in the list
        }
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "done";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { findCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
//selector
export const selectAllCategories = (state) =>
  state.categoryReducer.listCategories;
export const selectCategory = (state) => state.categoryReducer.category;
export default categoryReducer;
