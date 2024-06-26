import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

// Du lieu ban dau
const initialState = {
  listInvoices: [],
  listDetailInvoices: [],
  invoice: {},
  error: null,
  status: "idle",
};

const token = localStorage.getItem("accessToken");

export const getAllInvoices = createAsyncThunk(
  "invoices/getAllInvoices",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices/getAlls`, {
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

export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (bookingId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/invoices/create?bookingId=${bookingId}`,
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

export const getAllDetailInvoices = createAsyncThunk(
  "invoices/getInvoiceDetail",
  async (invoiceId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/invoices/getInvoiceDetail/${invoiceId}`,
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

export const addFoodToInvoice = createAsyncThunk(
  "invoices/addFoodToInvoice",
  async (newInvoiceDetail) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/invoices/addFoodToInvoice`,
        newInvoiceDetail,
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

export const getInvoiceById = createAsyncThunk(
  "invoices/getInvoiceById",
  async (invoiceId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/invoices/getInvoiceById/${invoiceId}`,
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

export const getInvoiceByBookingId = createAsyncThunk(
  "invoices/getInvoiceByBookingId",
  async (bookingId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/invoices/getInvoiceByBookingId/${bookingId}`,
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

export const updateToInvoice = createAsyncThunk(
  "invoices/UpdateToInvoice",
  async (newInvoiceDetail) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/invoices/update`,
        newInvoiceDetail,
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

export const deleteInvocie = createAsyncThunk(
  "invoices/delete",
  async ({ invoiceId, foodId }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/invoices/delete?invoiceId=${invoiceId}&foodId=${foodId}`,
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

export const payInvoice = createAsyncThunk(
  "invoices/pay",
  async (invoiceId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/invoices/${invoiceId}/pay`,
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

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllInvoices.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.status = "done";
        state.listInvoices = action.payload; //action.payload ===== response.data
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status = "done";
        state.listInvoices.push(action.payload); //action.payload ===== response.data
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllDetailInvoices.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllDetailInvoices.fulfilled, (state, action) => {
        state.status = "done";
        state.listDetailInvoices = action.payload; //action.payload ===== response.data
      })
      .addCase(getAllDetailInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getInvoiceById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.status = "done";
        state.invoice = action.payload; //action.payload ===== response.data
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFoodToInvoice.fulfilled, (state, action) => {
        state.status = "done";
        state.listDetailInvoices.push(action.payload); //action.payload ===== response.data
      })
      .addCase(addFoodToInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(payInvoice.fulfilled, (state, action) => {
        state.status = "done";
        // Kiểm tra action.payload có tồn tại không
        if (action.payload) {
          // Cập nhật trạng thái của hóa đơn đã thanh toán
          const updatedInvoice = state.listInvoices.find(
            (invoice) => invoice.id === action.payload.id
          );
          if (updatedInvoice) {
            updatedInvoice.status = "PAID";
          }
        }
      })
      .addCase(getInvoiceByBookingId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvoiceByBookingId.fulfilled, (state, action) => {
        state.status = "done";
        state.invoice = action.payload; //action.payload ===== response.data
      })
      .addCase(getInvoiceByBookingId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// tao Reducer: voi moi State se co mot Reducer de
// chiu trach nhiem thay doi cac State day
export const invoiceReducer = invoiceSlice.reducer;

//selector
export const selectAllInvoices = (state) => state.invoiceReducer.listInvoices;
export const selectAllDetailInvoices = (state) =>
  state.invoiceReducer.listDetailInvoices;
export const selectInvoice = (state) => state.invoiceReducer.invoice;
export const selectError = (state) => state.invoiceReducer.error;
export const selectInvoiceByBookingId = (state, bookingId) =>
  state.invoiceReducer.listInvoices.find(
    (invoice) => invoice.bookingId === bookingId
  );

export default invoiceReducer;
