import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import SidebarBooking from "../../../components/sidebarBooking/SidebarBooking";
import {
  getAllInvoices,
  selectAllInvoices,
} from "../../../store/invoice/invoiceSlice";
import { Link } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./list.scss";
import { getAllBookings } from "../../../store/booking/bookingSlice";
import Tooltip from "@mui/material/Tooltip";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const ListInvoice = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("accessToken");
  const invoices = useSelector(selectAllInvoices);
  const [refresh, setRefresh] = useState(false);
  const [defaultSortModel, setDefaultSortModel] = useState([
    {
      field: "bookingId",
      sort: "desc",
    },
  ]);

  //Đổi trạng thái từ Tiếng Anh -> Tiếng Việt
  const getStatusNameInvoice = (status) => {
    const statusMapInvoice = {
      PENDING: "Đang chờ",
      ORDERED_FOOD: "Đã đặt món",
      PAID: "Đã thanh toán",
    };
    return statusMapInvoice[status] || status;
  };

  //Cột tiêu đề của Table Invoice
  const columnsInvoices = [
    {
      field: "bookingId",
      headerName: "Mã đặt bàn",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 130,
      valueGetter: (params) => getStatusNameInvoice(params.value),
    },

    {
      field: "date",
      headerName: "Ngày lập",
      width: 150,
      editable: true,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "totalPrice",
      headerName: "Tổng tiền",
      width: 170,
      editable: true,
    },
    {
      field: "checkInTime",
      headerName: "Thời gian vào",
      width: 150,
      editable: true,
      valueGetter: (params) =>
        new Date(params.value).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      field: "checkOutTime",
      headerName: "Thời gian ra",
      width: 200,
      valueGetter: (params) => {
        const checkOutTime = params.value;
        return checkOutTime
          ? `${new Date(checkOutTime).toLocaleDateString()} ${new Date(
              checkOutTime
            ).toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : "Chưa thanh toán";
      },
    },
    {
      field: "deskId",
      headerName: "Mã bàn",
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
      width: 200,
      renderCell: (params) => {
        if (params.row.status === "PAID") {
          return (
            <div className="cellAction">
              <div className="deleteButton">
                <Tooltip title="Không được phép">
                  <DoNotDisturbIcon />
                </Tooltip>
              </div>
            </div>
          );
        } else {
          return (
            <div className="cellAction">
              <Link
                to={`/invoices/addFoodToInvoice/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">
                  <Tooltip title="Thêm món ăn">
                    <PlaylistAddIcon />
                  </Tooltip>
                </div>
              </Link>
            </div>
          );
        }
      },
    },
  ];

  //Xử lý khi ấn nút Refresh
  const handleRefresh = () => {
    dispatch(getAllInvoices());
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getAllInvoices());
      dispatch(getAllBookings());
    }
  }, [jwt, dispatch, refresh]);

  return (
    <div className="list">
      <SidebarBooking />
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle">
            <div className="datatableTitle-content">
              <Link to="/invoices/new" className="link">
                Thêm mới
              </Link>
              <Button onClick={handleRefresh}>
                <Tooltip title="Load lại">
                  <RefreshIcon />
                </Tooltip>
              </Button>
            </div>
          </div>
          <div className="new">
            <div className="newContainer">
              <div className="bottom" style={{ flexDirection: "row" }}>
                <div className="right">
                  <div style={{ flex: 1, paddingLeft: 10 }}>
                    <div style={{ height: 550, width: "100%" }}>
                      {invoices && invoices.length > 0 ? (
                        <Box sx={{ height: 550, width: "100%" }}>
                          <DataGrid
                            rows={invoices}
                            columns={columnsInvoices.concat(actionColumn)}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListInvoice;
