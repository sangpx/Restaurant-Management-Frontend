import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";



// Du lieu ban dau
const initialState = {
  listDesks: []
};

const token = localStorage.getItem("accessToken");

export const getAlls = createAsyncThunk("desks/getAlls", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/desks/getAlls`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const deskSlice = createSlice({
  name: "desks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAlls.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAlls.fulfilled, (state, action) => {
        state.status = "done";
        state.listDesks = action.payload; //action.payload ===== response.data
      })
      .addCase(getAlls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// tao Reducer: voi moi State se co mot Reducer de
// chiu trach nhiem thay doi cac State day
export const deskReducer = deskSlice.reducer;

//selector
export const selectAllDesks = (state) => state.deskReducer.listDesks;

export default deskReducer;
