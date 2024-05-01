import "./list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  deleteDesk,
  getAlls,
  selectAllDesks,
} from "../../../store/desk/deskSlice";
import Tooltip from "@mui/material/Tooltip";

const getStatusName = (status) => {
  const statusMap = {
    EMPTY: "Trống",
    BOOKED: "Đã đặt",
    CLEANED: "Đã dọn dẹp",
  };
  return statusMap[status] || status;
};

const columns = [{ field: "name", headerName: "Tên bàn", width: 330 }];

const ListDesk = () => {
  const dispatch = useDispatch();
  const desks = useSelector(selectAllDesks);
  const jwt = localStorage.getItem("accessToken");
  const [deleteId, setDeleteId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    dispatch(getAlls());
  };

  const handleDelete = () => {
    dispatch(deleteDesk(deleteId));
    setDeleteId(null);
    handleClose();
    setRefresh(!refresh);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Tác vụ",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/desks/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                <Tooltip title="Chỉnh sửa">
                  <EditIcon />
                </Tooltip>
              </div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick={() => handleClickOpen(params.row.id)}
            >
              <DeleteIcon />
            </div> */}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (jwt) {
      dispatch(getAlls());
    }
  }, [jwt, dispatch, refresh]);

  return (
    <div className="list">
      <Sidebar />
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
              <Link to="/desks/new" className="link">
                Thêm mới
              </Link>
              <Button onClick={handleRefresh}>
                <Tooltip title="Load lại">
                  <RefreshIcon />
                </Tooltip>
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 25, height: 550, width: "100%" }}>
            {desks && desks.length > 0 ? (
              <DataGrid
                rows={desks}
                columns={columns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    pageSize: 8,
                  },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDelete} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListDesk;
