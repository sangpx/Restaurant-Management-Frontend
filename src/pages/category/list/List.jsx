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
import { getAlls, selectAllCategories } from "../../../store/category/categorySlice";


const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Tên loại", width: 130 },
  { field: "image", headerName: "Ảnh", width: 130 },
];

const ListCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const jwt = localStorage.getItem("accessToken");

  const handleDelete = (id) => {
    console.log("Id", id);
  };

  const handleUpdate = (id) => {
    console.log("Id: ", id);
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
            <Link to="/categories/edit" style={{ textDecoration: "none" }}>
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
              <Link to="/categories/new" className="link">
                Thêm mới
              </Link>
              <Button onClick={handleRefresh}>
                <RefreshIcon />
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 25, height: 550, width: "100%" }}>
            {categories && categories.length > 0 ? (
              <DataGrid
                rows={categories}
                columns={columns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    pageSize:5
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

export default ListCategory;
