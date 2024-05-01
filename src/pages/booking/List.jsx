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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlls, selectAllDesks } from "../../store/desk/deskSlice";
import {
  confirmDeskCustomer,
  createBooking,
  deleteBooking,
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
  getInvoiceByBookingId,
  selectInvoiceByBookingId,
} from "../../store/invoice/invoiceSlice";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditIcon from "@mui/icons-material/Edit";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import DeleteIcon from "@mui/icons-material/Delete";

const ListBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const desks = useSelector(selectAllDesks);
  const bookings = useSelector(selectAllBookings);
  const [selectedDesk, setSelectedDesk] = useState("");
  const [selectedDeskHolding, setSelectedDeskHolding] = useState("");
  const [open, setOpen] = useState(false);
  const [openAddFood, setOpenAddFood] = useState(false);
  const [openAddDesk, setOpenAddDesk] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newBooking, setNewBooking] = useState({
    customerName: "",
    address: "",
    quantityPerson: 0,
    phone: "",
    deskId: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [defaultSortModel, setDefaultSortModel] = useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  //xử lý mở dialog chọn bàn
  const handleAddDeskClickOpen = (id) => {
    setSelectedBookingId(id);
    setOpenAddDesk(true);
  };

  //Xử lý mở dialog xóa đặt bàn
  const handleDeleteRow = (id) => {
    setSelectedBookingId(id);
    setOpenDeleteDialog(true);
  };

  //Xử lý khi ấn Xóa đặt bàn
  const handleConfirmDelete = () => {
    dispatch(deleteBooking(selectedBookingId));
    alert("Xóa đặt bàn thành công!");
    setOpenDeleteDialog(false);
    dispatch(getAllBookings());
    dispatch(getAlls());
  };

  //xử lý khi giữ bàn cho khách
  const handlHoldingDeskCustomer = () => {
    dispatch(
      holdingDeskCustomer({
        bookingId: selectedBookingId,
        deskId: selectedDeskHolding,
      })
    );
    alert("Giữ chỗ thành công!");
    handleClose();
  };

  //xử lý khi khách tới nhận bàn thì xác nhận
  const handleConfirmDeskCustomer = (selectedBookingId) => {
    dispatch(confirmDeskCustomer(selectedBookingId));
    alert("Nhận bàn thành công!");
    dispatch(getAllBookings());
  };

  //Đổi trạng thái từ Tiếng Anh -> Tiếng Việt
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

  //Cột của Table Booking
  const columnsBookings = [
    {
      field: "id",
      headerName: "Mã đặt bàn",
      width: 150,
      editable: true,
    },
    {
      field: "customerName",
      headerName: "Tên khách hàng",
      width: 200,
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
      field: "email",
      headerName: "Email",
      width: 200,
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

  //Cột tác vụ
  const actionColumn = [
    {
      field: "action",
      headerName: "Tác vụ",
      width: 250,
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
                  onClick={() => {
                    handleClickAddFoodOpen(params.row.id);
                  }}
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
                <div className="viewButton">
                  <Tooltip title="Thêm hóa đơn">
                    <AddCircleIcon
                      onClick={() => {
                        handleClickOpen(params.row.id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteRow(params.row.id);
                      }}
                    />
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

  //Xử lý khi ấn vào nút Add
  const handleClickOpen = (id) => {
    setSelectedBookingId(id);
    setOpen(true);
  };

  //Xử lý khi ấn vào nút PlaylistAdd
  const handleClickAddFoodOpen = (id) => {
    setSelectedBookingId(id);
    setOpenAddFood(true);
    dispatch(getAllBookings());
    dispatch(getAllInvoices());
    dispatch(getInvoiceByBookingId(id));
  };

  const invoice = useSelector((state) =>
    selectInvoiceByBookingId(state, selectedBookingId)
  );

  //xử lý chuyển trang khi ấn gọi món ăn
  const handleAddFoodInvoice = () => {
    navigate(`/invoices/addFoodToInvoice/${invoice.id}`);
  };

  //xử lý đóng Dialog
  const handleClose = () => {
    setOpen(false);
    setOpenAddDesk(false);
    setOpenAddFood(false);
  };

  //xử lý thêm hóa đơn
  const handleAddInvoice = () => {
    dispatch(createInvoice(selectedBookingId));
    alert("Thêm hóa đơn thành công!");
    dispatch(getAllInvoices());
    dispatch(getAllBookings());
    handleClose();
  };

  //xử lý khi ấn Refresh
  const handleRefresh = () => {
    dispatch(getAllInvoices());
    dispatch(getAllBookings());
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
      dispatch(getAllInvoices());
      dispatch(getAllBookings());
    }
  }, [jwt, dispatch, refresh]);

  //xử lý khi thêm đặt bàn mới
  const handleAddBooking = (event) => {
    event.preventDefault();
    const bookingData = {
      ...newBooking,
      deskId: selectedDesk,
    };
    dispatch(createBooking(bookingData));
    alert("Thêm mới đặt bàn thành công!");
    dispatch(getAllBookings());
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
    dispatch(getAlls());
  };

  //xử lý khi hủy đặt bàn
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
            <div className="bottom" style={{ flexDirection: "column" }}>
              <div className="left" style={{ flex: "3 1" }}>
                {bookings && bookings.length > 0 ? (
                  <Box sx={{ height: 597, width: "100%" }}>
                    <DataGrid
                      rows={bookings}
                      columns={columnsBookings.concat(actionColumn)}
                      sortModel={defaultSortModel}
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
                                  {desk.id}
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

      {/* Thêm mới món ăn cho hóa đơn */}
      <Dialog
        open={openAddFood}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Gọi món</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn thêm món ăn cho hóa đơn này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              handleAddFoodInvoice();
            }}
          >
            Thêm mới
          </Button>
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

      {/* Xóa Đặt bàn */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa đặt bàn"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa đặt bàn?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListBooking;
