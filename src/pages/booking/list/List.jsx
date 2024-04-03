import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlls, selectAllDesks } from "../../../store/desk/deskSlice";
import "./Booking.scss";
import {
  createBooking,
  getAllBookings,
  selectAllBookings,
} from "../../../store/booking/bookingSlice";
import RefreshIcon from "@mui/icons-material/Refresh";


const getStatusName = (status) => {
  const statusMap = {
    EMPTY: "Trống",
    BOOKED: "Đã đặt",
    CLEANED: "Đã dọn dẹp",
  };
  return statusMap[status] || status;
};

const getStatusNameBooking = (status) => {
  const statusMapBooking = {
    PENDING: "Đang chờ",
    CONFIRMED: "Đã xác nhận",
  };
  return statusMapBooking[status] || status;
};

const columnsDesk = [
  { field: "id", headerName: "Mã bàn", width: 130 },

  { field: "name", headerName: "Tên bàn", width: 130 },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 130,
    valueGetter: (params) => getStatusName(params.value),
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

  // {
  //   field: "status",
  //   headerName: "Trạng thái",
  //   width: 130,
  //   valueGetter: (params) => getStatusNameBooking(params.value),
  // },
];

const ListBooking = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const desks = useSelector(selectAllDesks);
  const bookings = useSelector(selectAllBookings);
  const [selectedDesk, setSelectedDesk] = useState("");
   const [newBooking, setNewBooking] = useState({
     customerName: "",
     address: "",
     quantityPerson: 0,
     phone: "",
     deskId: "",
   });
  const [refresh, setRefresh] = useState(false);
  
 const handleRefresh = () => {
   dispatch(getAllBookings());
    dispatch(getAlls());
   
 };

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setNewBooking((prevNewBooking) => ({
     ...prevNewBooking,
     [name]: name === "quantityPerson" ? parseInt(value) : value,
   }));
 };
  
  const handleDeskChange = (e) => {
    setSelectedDesk(e.target.value);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getAlls());
    }
  }, [jwt, dispatch, refresh]);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllBookings());
    }
  }, [jwt, dispatch, refresh]);

  const handleAddBooking = (event) => {
    event.preventDefault();
   const bookingData = {
     ...newBooking,
     deskId: selectedDesk,
   };
    dispatch(createBooking(bookingData));
    setNewBooking([
      {
        customerName: "",
        address: "",
        quantityPerson: 0,
        phone: "",
        deskId: "",
      },
    ]);
    setSelectedDesk("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setNewBooking([
      {
        customerName: "",
        address: "",
        quantityPerson: 0,
        phone: "",
        deskId: "",
      },
    ]);
    setSelectedDesk("");
  };

  return (
    <div className="list">
      <div className="listContainer">
        <div className="new">
          <div className="newContainer">
            <div className="top">
              <div className="datatableTitle">
                <div className="datatableTitle-content">
                  <Button onClick={handleRefresh}>
                    <RefreshIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                {/* {desks && desks.length > 0 ? (
                  <Box sx={{ height: 580, width: "100%" }}>
                    <DataGrid
                      rows={desks}
                      columns={columnsDesk}
                      initialState={{
                        pagination: {
                          pageSize: 10,
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  </Box>
                ) : (
                  <CircularProgress />
                )} */}
                {bookings && bookings.length > 0 ? (
                    <Box sx={{ height: 597, width: "100%" }}>
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
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: 20,
                  }}
                >
                  <form onSubmit={handleAddBooking} method="post">
                    <div className="formInput">
                      <TextField
                        className="input"
                        label="Tên khách hàng"
                        name="customerName"
                        id="customerName"
                        placeholder="Nhập Tên khách hàng"
                        variant="standard"
                        value={newBooking.customerName || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="formInput">
                      <TextField
                        className="input"
                        label="Địa chỉ"
                        name="address"
                        id="address"
                        placeholder="Nhập Địa chỉ"
                        variant="standard"
                        value={newBooking.address || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="formInput">
                      <TextField
                        className="input"
                        label="Số lượng người"
                        name="quantityPerson"
                        id="quantityPerson"
                        placeholder="Nhập Số lượng người"
                        variant="standard"
                        value={newBooking.quantityPerson || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="formInput">
                      <TextField
                        className="input"
                        label="Số điện thoại"
                        name="phone"
                        id="phone"
                        placeholder="Nhập Số điện thoại"
                        variant="standard"
                        value={newBooking.phone || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="formInput">
                      <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="deskId">Mã bàn</InputLabel>
                        <Select
                          className="input"
                          labelId="deskId"
                          id="deskId"
                          label="Mã bàn"
                          name="deskId"
                          value={selectedDesk}
                          onChange={handleDeskChange}
                        >
                          {desks &&
                            desks.map((desk) => (
                              <MenuItem key={desk.id} value={desk.id}>
                                {desk.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="formButton">
                      <Button onClick={handleCancel}>Hủy</Button>
                      <Button type="submit">Thêm mới</Button>
                    </div>
                  </form>
                </div>
                <div style={{ flex: 1, padding: 10 }}>
                  {/* {bookings && bookings.length > 0 ? (
                    <Box sx={{ height: 200, width: "100%" }}>
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
                  )} */}
                  {desks && desks.length > 0 ? (
                    <Box sx={{ height: 200, width: "100%" }}>
                      <DataGrid
                        rows={desks}
                        columns={columnsDesk}
                        initialState={{
                          pagination: {
                            pageSize: 10,
                          },
                        }}
                        pageSizeOptions={[5, 10]}
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
  );
};

export default ListBooking;
