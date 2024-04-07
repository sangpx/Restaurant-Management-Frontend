import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import SidebarInvoice from "../../../components/sidebarInvoice/SidebarInvoice";
import {
  getAllInvoices,
  selectAllInvoices,
} from "../../../store/invoice/invoiceSlice";
import { Link } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./list.scss";
import {
  getAllBookings,
  selectAllBookings,
} from "../../../store/booking/bookingSlice";
import PaymentIcon from "@mui/icons-material/Payment";
import Tooltip from "@mui/material/Tooltip";

const getStatusNameInvoice = (status) => {
  const statusMapInvoice = {
    PENDING: "Đang chờ",
    ORDERED_FOOD: "Đã đặt món",
    PAID: "Đã thanh toán",
  };
  return statusMapInvoice[status] || status;
};

const columnsInvoices = [
  {
    field: "id",
    headerName: "Mã Hóa đơn",
    sortable: false,
    width: 160,
  },

  {
    field: "date",
    headerName: "Ngày lập",
    width: 150,
    editable: true,
    valueGetter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "totalPrice",
    headerName: "Tổng tiền",
    width: 170,
    editable: true,
  },
  {
    field: "checkInTime",
    headerName: "Thời gian vào",
    width: 150,
    editable: true,
    valueGetter: (params) =>
      new Date(params.value).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    field: "checkOutTime",
    headerName: "Thời gian ra",
    width: 150,
    editable: true,
    valueGetter: (params) => {
      const checkOutTime = params.value;
      return checkOutTime
        ? new Date(checkOutTime).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Chưa thanh toán";
    },
  },
  {
    field: "deskId",
    headerName: "Mã bàn",
    type: "number",
    width: 110,
    editable: true,
  },

  {
    field: "bookingId",
    headerName: "Mã đặt bàn",
    type: "number",
    width: 110,
    editable: true,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    width: 130,
    valueGetter: (params) => getStatusNameInvoice(params.value),
  },
];

const actionColumn = [
  {
    field: "action",
    headerName: "Tác vụ",
    width: 150,
    renderCell: (params) => {
      //Check điều kiện nếu trong trạng thái "PAID"
      if (params.row.status === "PAID") {
        return (
          <div className="cellAction">
            <div className="deleteButton">
              <Tooltip title="In Hóa Đơn">
                <PrintIcon />
              </Tooltip>
            </div>
          </div>
        );
      } else {
        return (
          <div className="cellAction">
            <Link
              to={`/invoices/addFoodToInvoice/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                <Tooltip title="Thêm món ăn">
                  <PlaylistAddIcon />
                </Tooltip>
              </div>
            </Link>
            <div className="deleteButton">
              <Tooltip title="In Hóa Đơn">
                <PrintIcon />
              </Tooltip>
            </div>
            <div className="paymentButton">
              <Tooltip title="Thanh Toán">
                <PaymentIcon />
              </Tooltip>
            </div>
          </div>
        );
      }
    },
  },
];

const columnsBookings = [
  {
    field: "id",
    headerName: "Mã Đặt bàn",
    sortable: false,
    width: 160,
  },

  {
    field: "customerName",
    headerName: "Tên khách hàng",
    width: 150,
    editable: true,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 170,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 150,
    editable: true,
  },
  {
    field: "quantityPerson",
    headerName: "Số lượng người",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "deskId",
    headerName: "Mã bàn",
    type: "number",
    width: 110,
    editable: true,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    width: 130,
    valueGetter: (params) => getStatusNameBooking(params.value),
  },
];

const getStatusNameBooking = (status) => {
  const statusMapBooking = {
    INACTIVE: "Đã hoàn thành",
    CONFIRMED: "Đã xác nhận",
  };
  return statusMapBooking[status] || status;
};

const ListInvoice = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const invoices = useSelector(selectAllInvoices);
  const bookings = useSelector(selectAllBookings);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    dispatch(getAllInvoices());
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getAllInvoices());
    }
  }, [jwt, dispatch, refresh]);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllBookings());
    }
  }, [jwt, dispatch, refresh]);

  return (
    <div className="list">
      <SidebarInvoice />
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle">
            <TextField
              style={{
                width: 200,
              }}
              id="outlined-basic"
              label="Tìm kiếm"
              variant="outlined"
            />
            <div className="datatableTitle-content">
              <Link to="/invoices/new" className="link">
                Thêm mới
              </Link>
              <Button onClick={handleRefresh}>
                <Tooltip title="Load lại">
                  <RefreshIcon />
                </Tooltip>
              </Button>
            </div>
          </div>
          <div className="new">
            <div className="newContainer">
              <div className="bottom" style={{ flexDirection: "row" }}>
                <div className="left">
                  {bookings && bookings.length > 0 ? (
                    <Box sx={{ height: 550, width: "100%" }}>
                      <DataGrid
                        rows={bookings}
                        columns={columnsBookings}
                        initialState={{
                          pagination: {
                            pageSize: 8,
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        disableSelectionOnClick
                      />
                    </Box>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
                <div className="right">
                  <div style={{ flex: 1, paddingLeft: 10 }}>
                    <div style={{ height: 550, width: "100%" }}>
                      {invoices && invoices.length > 0 ? (
                        <Box sx={{ height: 550, width: "100%" }}>
                          <DataGrid
                            rows={invoices}
                            columns={columnsInvoices.concat(actionColumn)}
                            initialState={{
                              pagination: {
                                pageSize: 8,
                              },
                            }}
                            pageSizeOptions={[5, 10]}
                            disableSelectionOnClick
                          />
                        </Box>
                      ) : (
                        <CircularProgress />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListInvoice;