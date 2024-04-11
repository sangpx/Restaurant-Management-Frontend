import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlls, selectAllDesks } from "../../store/desk/deskSlice";
import {
  confirmDeskCustomer,
  createBooking,
  getAllBookings,
  holdingDeskCustomer,
  selectAllBookings,
} from "../../store/booking/bookingSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import SidebarBooking from "../../components/sidebarBooking/SidebarBooking";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import {
  createInvoice,
  getAllInvoices,
  selectAllInvoices,
} from "../../store/invoice/invoiceSlice";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditIcon from "@mui/icons-material/Edit";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

const ListBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const desks = useSelector(selectAllDesks);
  const bookings = useSelector(selectAllBookings);
  const invoices = useSelector(selectAllInvoices);
  const [selectedDesk, setSelectedDesk] = useState("");
  const [selectedDeskHolding, setSelectedDeskHolding] = useState("");
  const [open, setOpen] = useState(false);
  const [openAddDesk, setOpenAddDesk] = useState(false);
  const [newBooking, setNewBooking] = useState({
    customerName: "",
    address: "",
    quantityPerson: 0,
    phone: "",
    deskId: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const findInvoiceIdByBookingId = (bookingId) => {
    const booking = bookings.find((booking) => booking.id === bookingId);
    if (booking) {
      const invoice = invoices.find(
        (invoice) => invoice.bookingId === bookingId
      );
      return invoice ? invoice.id : null;
    }
    return null;
  };

  const handleAddFoodToInvoiceDetail = (invoiceId) => {
    navigate(`/invoices/addFoodToInvoice/${invoiceId}`);
  };

  const handleAddDeskClickOpen = (id) => {
    setSelectedBookingId(id);
    setOpenAddDesk(true);
  };

  const handlHoldingDeskCustomer = () => {
    dispatch(
      holdingDeskCustomer({
        bookingId: selectedBookingId,
        deskId: selectedDeskHolding,
      })
    );
    handleClose();
  };

  const handleConfirmDeskCustomer = (selectedBookingId) => {
    dispatch(confirmDeskCustomer(selectedBookingId));
  };

  const getStatusNameBooking = (status) => {
    const statusMapBooking = {
      INACTIVE: "Đã hoàn thành",
      CONFIRMED: "Đã xác nhận",
      WORKING: "Đang có hóa đơn",
      PENDING: "Đang chờ",
      HOLDING_A_SEAT: "Đang giữ chỗ",
    };
    return statusMapBooking[status] || status;
  };

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
      field: "status",
      headerName: "Trạng thái",
      width: 130,
      valueGetter: (params) => getStatusNameBooking(params.value),
    },
    {
      field: "deskId",
      headerName: "Mã bàn",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 170,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
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
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Tác vụ",
      width: 150,
      renderCell: (params) => {
        let iconComponent;
        switch (params.row.status) {
          case "INACTIVE":
            iconComponent = (
              <div className="cellAction">
                <div className="deleteButton">
                  <Tooltip title="Đã hoàn thành">
                    <DoNotDisturbIcon />
                  </Tooltip>
                </div>
              </div>
            );
            break;
          case "WORKING":
            iconComponent = (
              <div className="cellAction">
                <div
                  className="viewButton"
                  onClick={() =>
                    handleAddFoodToInvoiceDetail(
                      findInvoiceIdByBookingId(params.row.id)
                    )
                  }
                >
                  <Tooltip title="Thêm món ăn">
                    <PlaylistAddIcon />
                  </Tooltip>
                </div>
              </div>
            );
            break;
          case "PENDING":
            iconComponent = (
              <div className="cellAction">
                <div
                  className="viewButton"
                  onClick={() => handleAddDeskClickOpen(params.row.id)}
                >
                  <Tooltip title="Giữ chỗ">
                    <EditIcon />
                  </Tooltip>
                </div>
              </div>
            );
            break;
          case "CONFIRMED":
            iconComponent = (
              <div className="cellAction">
                <div
                  className="viewButton"
                  onClick={() => handleClickOpen(params.row.id)}
                >
                  <Tooltip title="Thêm hóa đơn">
                    <AddCircleIcon />
                  </Tooltip>
                </div>
              </div>
            );
            break;
          case "HOLDING_A_SEAT":
            iconComponent = (
              <div className="cellAction">
                <div
                  className="viewButton"
                  onClick={() => handleConfirmDeskCustomer(params.row.id)}
                >
                  <Tooltip title="Nhận bàn">
                    <TableRestaurantIcon />
                  </Tooltip>
                </div>
              </div>
            );
            break;
          default:
            iconComponent = null;
            break;
        }

        return (
          <div className="cellAction">
            <div className="viewButton">{iconComponent}</div>
          </div>
        );
      },
    },
  ];

  const handleClickOpen = (id) => {
    setSelectedBookingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddDesk(false);
  };

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleAddInvoice = () => {
    dispatch(createInvoice(selectedBookingId));
    handleClose();
  };

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

  const handleHoldingDeskChange = (e) => {
    setSelectedDeskHolding(e.target.value);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getAlls());
    }
  }, [jwt, dispatch, refresh]);

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
        email: "",
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
        email: "",
      },
    ]);
    setSelectedDesk("");
  };

  return (
    <div className="list">
      <SidebarBooking />
      <div className="listContainer">
        <div className="new">
          <div className="newContainer">
            <div className="top">
              <div className="datatableTitle">
                <div className="datatableTitle-content">
                  <Button onClick={handleRefresh}>
                    <Tooltip title="Load lại">
                      <RefreshIcon />
                    </Tooltip>
                  </Button>
                </div>
              </div>
            </div>
            <div className="bottom" style={{ flexDirection: "row" }}>
              <div className="left" style={{ flex: "3 1" }}>
                {bookings && bookings.length > 0 ? (
                  <Box sx={{ height: 597, width: "100%" }}>
                    <DataGrid
                      rows={bookings}
                      columns={columnsBookings.concat(actionColumn)}
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
                    padding: 10,
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
                        label="Email"
                        name="email"
                        id="email"
                        placeholder="Nhập Email"
                        variant="standard"
                        value={newBooking.email || ""}
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
                      <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="deskId">Tên bàn</InputLabel>
                        <Select
                          className="input"
                          labelId="deskId"
                          id="deskId"
                          label="Tên bàn"
                          name="deskId"
                          value={selectedDesk}
                          onChange={handleDeskChange}
                        >
                          {desks &&
                            desks
                              .filter((desk) => desk.status === "EMPTY")
                              .map((desk) => (
                                <MenuItem key={desk.id} value={desk.id}>
                                  {desk.name}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
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

                    <div className="formButton">
                      <Button onClick={handleCancel}>Hủy</Button>
                      <Button type="submit">Thêm mới</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thêm mới hóa đơn */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thêm hóa đơn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn thêm hóa đơn cho đặt bàn này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAddInvoice}>Thêm mới</Button>
        </DialogActions>
      </Dialog>

      {/* Thêm bàn ăn vào đặt bàn có trạng thái Đang Chờ */}
      <Dialog
        open={openAddDesk}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thêm bàn ăn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="formInput">
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="deskId">Tên bàn</InputLabel>
                <Select
                  className="input"
                  labelId="deskId"
                  id="deskId"
                  label="Tên bàn"
                  name="deskId"
                  value={selectedDeskHolding}
                  onChange={handleHoldingDeskChange}
                >
                  {desks &&
                    desks
                      .filter((desk) => desk.status === "EMPTY")
                      .map((desk) => (
                        <MenuItem key={desk.id} value={desk.id}>
                          {desk.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handlHoldingDeskCustomer}>Thêm mới</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListBooking;
