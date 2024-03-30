import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";



// Du lieu ban dau
const initialState = {
  listDesks: [],
  desk: {},
  error: null,
  status: "idle",
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

export const createDesk = createAsyncThunk("desks/createDesk", async (newDesk) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/desks/createDesk`,
      newDesk,
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
});

export const updateDesk = createAsyncThunk(
  "desks/updateDesk",
  async ({ id, newDesk }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/desks/updateDesk/${id}`,
        newDesk,
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

export const detailDesk = createAsyncThunk(
  "desks/getDetailDesk",
  async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/desks/getDetailDesk/${id}`,
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

export const deleteDesk = createAsyncThunk(
  "desks/deleteDesk",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/desks/deleteDesk/${id}`,
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
      })
      .addCase(detailDesk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(detailDesk.fulfilled, (state, action) => {
        state.status = "done";
        state.desk = action.payload;
      })
      .addCase(detailDesk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDesk.fulfilled, (state, action) => {
        state.status = "done";
        state.listDesks.push(action.payload); //action.payload ===== response.data
      })
      .addCase(createDesk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDesk.fulfilled, (state, action) => {
        state.status = "done";
        const updatedDesk = action.payload;
        const index = state.listDesks.findIndex(
          (desk) => desk.id === updatedDesk.id
        );
        if (index !== -1) {
          state.listDesks[index] = updatedDesk;
        }
      })
      .addCase(deleteDesk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteDesk.fulfilled, (state, action) => {
        state.status = "done";
      })
      .addCase(deleteDesk.rejected, (state, action) => {
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
export const selectDesk = (state) => state.deskReducer.desk;

export default deskReducer;
