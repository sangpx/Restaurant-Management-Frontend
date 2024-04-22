import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

// Du lieu ban dau
const initialState = {
  listBookings: [],
  booking: {},
  error: null,
  status: "idle",
};

const token = localStorage.getItem("accessToken");

export const getAllBookings = createAsyncThunk(
  "bookings/getAllBookings",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/getAlls`, {
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

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (newBooking) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/bookings/addBooking`,
        newBooking,
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

export const customerAddBooking = createAsyncThunk(
  "bookings/customerAddBooking",
  async (newCustomerBooking) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/bookings/customerAddBooking`,
        newCustomerBooking,
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

export const holdingDeskCustomer = createAsyncThunk(
  "bookings/holdingDeskCustomer",
  async ({ bookingId, deskId }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/bookings/holdingDeskCustomer?bookingId=${bookingId}&deskId=${deskId}`,
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

export const confirmDeskCustomer = createAsyncThunk(
  "bookings/confirmDeskCustomer",
  async (bookingId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/bookings/confirmDeskCustomer?bookingId=${bookingId}`,
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

export const detailBooking = createAsyncThunk(
  "bookings/getDetailBooking",
  async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/bookings/getDetailBooking/${id}`,
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

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/bookings/deleteBooking/${id}`,
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

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.status = "done";
        state.listBookings = action.payload; //action.payload ===== response.data
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "done";
        state.listBookings.push(action.payload); //action.payload ===== response.data
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(customerAddBooking.fulfilled, (state, action) => {
        state.status = "done";
        state.listBookings.push(action.payload); //action.payload ===== response.data
      })
      .addCase(customerAddBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// tao Reducer: voi moi State se co mot Reducer de
// chiu trach nhiem thay doi cac State day
export const bookingReducer = bookingSlice.reducer;

//selector
export const selectAllBookings = (state) => state.bookingReducer.listBookings;
export const selectBooking = (state) => state.bookingReducer.book;

export default bookingReducer;
