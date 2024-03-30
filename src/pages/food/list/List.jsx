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
import { getAlls, selectAllFoods } from "../../../store/food/foodSlice";

const columns = [
  { field: "name", headerName: "Tên Món ăn", width: 330 },
  { field: "description", headerName: "Mô tả", width: 230 },
  { field: "price", headerName: "Giá", width: 130 },
  { field: "categoryName", headerName: "Loại món ăn", width: 130 },
];

const ListFood = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const foods = useSelector(selectAllFoods);


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
              to={`/foods/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                <EditIcon />
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
              <Link to="/foods/new" className="link">
                Thêm mới
              </Link>
              <Button onClick={handleRefresh}>
                <RefreshIcon />
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 25, height: 550, width: "100%" }}>
            {foods && foods.length > 0 ? (
              <DataGrid
                rows={foods}
                columns={columns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    pageSize: 5,
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

export default ListFood;
