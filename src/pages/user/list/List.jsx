import "./list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import { selectAllUsers, getAlls } from "../../../store/auth/authSlice";
import Tooltip from "@mui/material/Tooltip";

const getRoleName = (roles) => {
  const roleMap = {
    ROLE_ADMIN: "Quản lý",
    ROLE_RECEPTIONIST: "Phục vụ",
    ROLE_CASHIER: "Thu ngân",
    ROLE_USER: "Người dùng",
  };
  return roles && roles.length > 0
    ? roles.map((role) => roleMap[role.name]).join(", ")
    : "";
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
    width: 330,
    valueGetter: (params) => getRoleName(params.row.roles),
  },
];

const ListUser = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const users = useSelector(selectAllUsers);
  const [refresh, setRefresh] = useState(false);

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
            <Link
              to={`/users/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                <Tooltip title="Chỉnh sửa">
                  <EditIcon />
                </Tooltip>
              </div>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (jwt) {
      dispatch(getAlls(jwt));
    }
  }, [jwt, dispatch, refresh]);

  //Lọc bỏ người dùng với chức vụ là "Người dùng"
  const filteredUsers = users.filter(
    (user) => getRoleName(user.roles) !== "Người dùng"
  );

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
                <Tooltip title="Load lại">
                  <RefreshIcon />
                </Tooltip>
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 25, height: 550, width: "100%" }}>
            {filteredUsers && filteredUsers.length > 0 ? (
              <DataGrid
                rows={filteredUsers}
                columns={columns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    pageSize: 5,
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
    </div>
  );
};

export default ListUser;
