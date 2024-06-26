import "./AddFoodToInvoice.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { getAlls, selectAllFoods } from "../../../store/food/foodSlice";
import Select from "@mui/material/Select";
import {
  addFoodToInvoice,
  deleteInvocie,
  getAllDetailInvoices,
  getAllInvoices,
  payInvoice,
  selectAllDetailInvoices,
  selectAllInvoices,
  updateToInvoice,
} from "../../../store/invoice/invoiceSlice";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PaymentIcon from "@mui/icons-material/Payment";
import PrintIcon from "@mui/icons-material/Print";
import SidebarBooking from "../../../components/sidebarBooking/SidebarBooking";
import ReactToPrint from "react-to-print";
import moment from "moment";
import ComponentToPrint from "./ComponentToPrint";

const AddFoodToInvoiceDetail = () => {
  let componentRef = useRef();

  //Cột tiêu đề Table Invoice Detail
  const columnsInvoiceDetail = [
    {
      field: "invoiceId",
      headerName: "Mã Hóa đơn",
      sortable: false,
      width: 160,
    },

    {
      field: "foodId",
      headerName: "Mã món ăn",
      width: 150,
      editable: true,
    },
    {
      field: "nameFood",
      headerName: "Tên món ăn",
      width: 250,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 130,
      editable: true,
      renderCell: (params) => (
        <Button onClick={() => handleEditRow(params.row)}>
          {params.value}
        </Button>
      ),
    },
    {
      field: "intoMoney",
      headerName: "Thành tiền",
      width: 150,
      editable: true,
      valueFormatter: (params) => formatIntoMoney(params.value),
    },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoiceDetails = useSelector(selectAllDetailInvoices);
  const invoices = useSelector(selectAllInvoices);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [deskId, setDeskId] = useState("");
  const [status, setStatus] = useState("");
  const foods = useSelector(selectAllFoods);
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
  // Hàm định dạng giá trị tiền thành VNĐ
  const formatIntoMoney = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  //Xử lý khi ấn icon delete
  const handleDeleteRow = (row) => {
    setSelectedRowToDelete(row);
    setOpenDeleteDialog(true);
  };

  //Xử lý khi ấn Xóa
  const handleConfirmDelete = () => {
    dispatch(
      deleteInvocie({
        invoiceId: selectedRowToDelete.invoiceId,
        foodId: selectedRowToDelete.foodId,
      })
    );
    alert("Xóa món ăn thành công!");
    setOpenDeleteDialog(false);
    dispatch(getAllDetailInvoices(id));
  };

  //Xử lý khi ấn icon edit
  const handleEditRow = (row) => {
    setSelectedRow(row);
    setOpenEditModal(true);
    // Set giá trị số lượng ban đầu cho ô chỉnh sửa
    setEditedQuantity(row.quantity);
  };

  //Xử lý khi ấn nút đóng Dialog
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  //Xử lý khi ấn nút Chỉnh sửa
  const handleSaveEdit = () => {
    dispatch(updateToInvoice({ ...selectedRow, quantity: editedQuantity }));
    alert("Cập nhật món ăn thành công!");
    setOpenEditModal(false);
    dispatch(getAllDetailInvoices(id));
  };

  //Cột tác vụ
  const actionColumn = [
    {
      field: "action",
      headerName: "Tác vụ",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <div className="cellAction">
              <div className="actionButtons">
                <div
                  className="viewButton"
                  onClick={() => handleEditRow(params.row)}
                  style={{ cursor: "pointer" }}
                >
                  <Tooltip title="Chỉnh sửa">
                    <EditIcon />
                  </Tooltip>
                </div>
                <div
                  className="deleteButton"
                  onClick={() => handleDeleteRow(params.row)}
                  style={{ cursor: "pointer", marginLeft: 10 }}
                >
                  <Tooltip title="Xóa">
                    <CloseIcon />
                  </Tooltip>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  //Xử lý khi ấn nút Refresh
  const handleRefresh = () => {
    dispatch(getAllDetailInvoices(id));
  };

  const handleFoodChange = (e) => {
    setSelectedFood(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllDetailInvoices(id));
    dispatch(getAlls());
    dispatch(getAllInvoices());
  }, [dispatch, refresh]);

  useEffect(() => {
    const idNumber = parseInt(id);
    const invoiceExisted = invoices.find((invoice) => invoice.id === idNumber);
    if (invoiceExisted) {
      const checkInTimeFormatted = moment(invoiceExisted.checkInTime).format(
        "DD/MM/YYYY [:] HH:mm"
      );
      const checkOutTimeFormatted = moment(invoiceExisted.checkOutTime).format(
        "DD/MM/YYYY [:] HH:mm"
      );
      setCheckInTime(checkInTimeFormatted);
      setCheckOutTime(checkOutTimeFormatted);
      setDeskId(invoiceExisted.deskId);
      setStatus(invoiceExisted.status);
    }
  }, [id, invoices]);

  //Xử lý ô input quantity
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  //Xử lý khi ấn Thêm món
  const handleOrderFood = (event) => {
    event.preventDefault();
    dispatch(
      addFoodToInvoice({ invoiceId: id, foodId: selectedFood, quantity })
    );
    alert("Thêm món ăn thành công!");
    dispatch(getAllDetailInvoices(id));
    setSelectedFood("");
    setQuantity(1);
  };

  //Xử lý khi ấn hủy thêm món
  const handleCancel = (event) => {
    event.preventDefault(event);
    setSelectedFood("");
    setQuantity(1);
    navigate("/bookings");
  };

  //Xử lý tính toán Tổng tiền
  const calculateTotalAmount = () => {
    let sum = 0;
    invoiceDetails.forEach((row) => {
      sum += row.intoMoney;
    });
    return sum;
  };

  //Quy đổi tiền sang tiền VNĐ
  const formattedTotalAmount = calculateTotalAmount().toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  //Xử lý khi ấn nút Thanh toán
  const handlePayment = (invoiceId) => {
    if (status === "ORDERED_FOOD") {
      dispatch(payInvoice(invoiceId));
      alert("Thanh toán thành công!");
    }
    dispatch(getAllInvoices());
  };

  const columnsFood = [
    { field: "name", headerName: "Tên Món ăn", width: 330 },
    { field: "description", headerName: "Mô tả", width: 230 },
    { field: "price", headerName: "Giá", width: 130 },
    { field: "categoryName", headerName: "Loại món ăn", width: 130 },
  ];

  return (
    <div className="new">
      <SidebarBooking />
      <div className="newContainer">
        <div className="bottom">
          <div className="right">
            {/* DataGrid Food*/}
            <div style={{ marginBottom: 25, height: 250, width: "100%" }}>
              {foods && foods.length > 0 ? (
                <DataGrid
                  rows={foods}
                  columns={columnsFood}
                  initialState={{
                    pagination: {
                      pageSize: 5,
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>

          <hr />

          <div className="right" style={{ marginTop: 15 }}>
            <form onSubmit={handleOrderFood} method="post" className="form">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Mã Hóa đơn"
                  name="invoiceId"
                  type="number"
                  id="invoiceId"
                  placeholder="Nhập Mã hóa đơn"
                  variant="standard"
                  value={id}
                  disabled
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Số lượng"
                  name="quantity"
                  type="number"
                  id="quantity"
                  placeholder="Nhập Số lượng"
                  variant="standard"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{
                    min: "0",
                  }}
                />
              </div>
              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="foodId">Tên món ăn</InputLabel>
                  <Select
                    className="input"
                    labelId="foodId"
                    id="foodId"
                    label="Tên món ăn"
                    value={selectedFood}
                    onChange={handleFoodChange}
                    name="foodId"
                  >
                    {foods &&
                      foods.length > 0 &&
                      foods.map((food) => (
                        <MenuItem key={food.id} value={food.id}>
                          {food.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="formButton">
                <Button onClick={handleCancel}>Hủy</Button>
                <Button type="submit">Gọi món</Button>
              </div>
            </form>
          </div>

          <div className="right" style={{ marginTop: 20 }}>
            <div
              className="right-top"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Tổng tiền: {formattedTotalAmount}</span>
              <div className="right-top_left"></div>
              <div className="right-top_left">
                <Button onClick={handleRefresh}>
                  <Tooltip title="Load lại">
                    <RefreshIcon />
                  </Tooltip>
                </Button>
              </div>
            </div>
            {/* DataGrid Invoice Details */}
            <div style={{ flex: 1, padding: 10 }}>
              {invoiceDetails && invoiceDetails.length > 0 ? (
                <Box sx={{ height: 280, width: "100%" }}>
                  <DataGrid
                    rows={invoiceDetails}
                    getRowId={(row) => row.foodId}
                    disableSelectionOnClick
                    columns={columnsInvoiceDetail.concat(actionColumn)}
                    initialState={{
                      pagination: {
                        pageSize: 4,
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
          <div className="right" style={{ marginTop: 20 }}>
            <div
              className="right-top"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="form">
                <div className="right-top_left">
                  <div className="formButton" onClick={() => handlePayment(id)}>
                    <Tooltip title="Thanh toán">
                      <Button disabled={status === "PENDING"}>
                        <PaymentIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                <div className="right-top_left">
                  {status === "PAID" ? (
                    <ReactToPrint
                      trigger={() => (
                        <Tooltip title="In Hóa đơn">
                          <Button>
                            <PrintIcon />
                          </Button>
                        </Tooltip>
                      )}
                      content={() => componentRef}
                    />
                  ) : (
                    <Tooltip title="In Hóa đơn">
                      <span>
                        <Button disabled>
                          <PrintIcon />
                        </Button>
                      </span>
                    </Tooltip>
                  )}
                  <div style={{ display: "none" }}>
                    <ComponentToPrint
                      invoiceDetails={invoiceDetails}
                      ref={(el) => (componentRef = el)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <TextField
            label="Chỉnh sửa số lượng"
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
          />
          <Button onClick={handleSaveEdit}>Lưu</Button>
          <Button onClick={handleCloseEditModal}>Đóng</Button>
        </div>
      </Modal>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa?
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

export default AddFoodToInvoiceDetail;
