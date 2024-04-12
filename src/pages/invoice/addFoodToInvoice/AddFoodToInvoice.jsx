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
import { useEffect, useState } from "react";
import { getAlls, selectAllFoods } from "../../../store/food/foodSlice";
import Select from "@mui/material/Select";
import {
  addFoodToInvoice,
  deleteInvocie,
  getAllDetailInvoices,
  getAllInvoices,
  payInvoice,
  selectAllDetailInvoices,
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

const AddFoodToInvoiceDetail = ({ title }) => {
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
    setOpenDeleteDialog(false);
  };

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setOpenEditModal(true);
    // Set giá trị số lượng ban đầu cho ô chỉnh sửa
    setEditedQuantity(row.quantity);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEdit = () => {
    dispatch(updateToInvoice({ ...selectedRow, quantity: editedQuantity }));
    setOpenEditModal(false);
    dispatch(getAllDetailInvoices(id));
  };

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

  const handleRefresh = () => {
    dispatch(getAllDetailInvoices(id));
  };

  const handleFoodChange = (e) => {
    setSelectedFood(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllDetailInvoices(id));
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(getAlls());
  }, [dispatch, refresh]);

  //Xử lý ô input quantity
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleOrderFood = (event) => {
    event.preventDefault();
    dispatch(
      addFoodToInvoice({ invoiceId: id, foodId: selectedFood, quantity })
    );
    dispatch(getAllDetailInvoices(id));
    setSelectedFood("");
    setQuantity(1);
  };

  const handleCancel = (event) => {
    event.preventDefault(event);
    setSelectedFood("");
    setQuantity(1);
    navigate("/bookings");
  };

  const calculateTotalAmount = () => {
    let sum = 0;
    invoiceDetails.forEach((row) => {
      sum += row.intoMoney;
    });
    return sum;
  };

  // Định dạng tổng tiền thành VNĐ
  const formattedTotalAmount = calculateTotalAmount().toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handlePayment = (invoiceId) => {
    dispatch(payInvoice(invoiceId));
    alert("Thanh toán thành công!");
    navigate("/invoices");
    dispatch(getAllInvoices());
  };

  return (
    <div className="new">
      <SidebarBooking />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
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
                    {foods.map((food) => (
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
            {/* DataGrid */}
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
                <div
                  className="right-top_left"
                  onClick={() => handlePayment(id)}
                >
                  <div className="formButton">
                    <Button>
                      <Tooltip title="Thanh toán">
                        <PaymentIcon />
                      </Tooltip>
                    </Button>
                  </div>
                </div>
                <div className="right-top_left">
                  <div className="formButton">
                    <Button>
                      <Tooltip title="In Hóa đơn">
                        <PrintIcon />
                      </Tooltip>
                    </Button>
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
