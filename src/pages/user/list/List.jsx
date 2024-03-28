import "./list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { selectAllUsers, getAlls } from "../../../store/auth/authSlice";

const getRoleName = (roles) => {
  const roleMap = {
    ROLE_ADMIN: "Quản lý",
    ROLE_RECEPTIONIST: "Phục vụ",
    ROLE_CASHIER: "Thu ngân",
  };
  return roles.map((role) => roleMap[role.name]).join(", ");
};

const getStatus = (status) => {
  return status ? "Đang hoạt động" : "Không hoạt động";
};

const columns = [
  { field: "username", headerName: "Tên đăng nhập", width: 230 },
  { field: "email", headerName: "Email", width: 230 },
  { field: "phone", headerName: "Số điện thoại", width: 130 },
  {
    field: "roles",
    headerName: "Chức vụ",
    width: 230,
    valueGetter: (params) => getRoleName(params.row.roles),
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 130,
    valueGetter: (params) => getStatus(params.row.status),
  },
];

const ListUser = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const users = useSelector(selectAllUsers);

  const handleDelete = (id) => {
    console.log("Id User", id);
  };

  const handleUpdate = (id) => {
    console.log("Id User: ", id);
  };

  const handleRefresh = () => {
    dispatch(getAlls());
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Tác vụ",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/edit" style={{ textDecoration: "none" }}>
              <div
                className="viewButton"
                onClick={() => handleUpdate(params.row.id)}
              >
                <EditIcon />
              </div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (jwt) {
      dispatch(getAlls(jwt));
    }
  }, [jwt, dispatch]);

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
              <Link to="/users/new" className="link">
                Thêm mới
              </Link>
              <Button onClick={handleRefresh}>
                <RefreshIcon />
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 25, height: 550, width: "100%" }}>
            {users && users.length > 0 ? (
              <DataGrid
                rows={users}
                columns={columns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    pageSize: 10,
                    // paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUser;
