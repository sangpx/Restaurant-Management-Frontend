import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DiscountIcon from "@mui/icons-material/Discount";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../../store/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout)
    // dispatch(logout);
    navigate('/signin');
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Grill63</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Trang Chủ</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <HomeOutlinedIcon className="icon" />
              <span>Trang Chủ</span>
            </li>
          </Link>

          <p className="title">Quản lý hệ thống</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Quản lý Người dùng</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Quản lý Loại món ăn</span>
            </li>
          </Link>
          <Link to="/foods" style={{ textDecoration: "none" }}>
            <li>
              <FastfoodIcon className="icon" />
              <span>Quản lý Món ăn</span>
            </li>
          </Link>
          <Link to="/floors" style={{ textDecoration: "none" }}>
            <li>
              <TableChartIcon className="icon" />
              <span>Quản lý Tầng/khu</span>
            </li>
          </Link>
          <Link to="/desk" style={{ textDecoration: "none" }}>
            <li>
              <TableRestaurantIcon className="icon" />
              <span>Quản lý Bàn ăn</span>
            </li>
          </Link>
          <Link to="/sales" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Quản lý Khuyến mại</span>
            </li>
          </Link>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <li>
              <ContactPageIcon className="icon" />
              <span>Quản lý Khách hàng</span>
            </li>
          </Link>
        
          {/* <p className="title">Quản lý đặt bàn</p>
          <li>
            <PersonOutlinedIcon className="icon" />
            <span>Thêm yêu cầu đặt bàn</span>
          </li>
          <p className="title">Quản lý thanh toán</p>
          <li>
            <ReceiptIcon className="icon" />
            <span>Lập hóa đơn</span>
          </li> */}

          <p className="title">Báo cáo thống kê</p>
          <Link to="/report-day" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentIcon className="icon" />
              <span>Thống kê DT theo ngày</span>
            </li>
          </Link>
          <Link to="/report-month" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentIcon className="icon" />
              <span>Thống kê DT theo tháng</span>
            </li>
          </Link>
          <Link to="/report-bill" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentIcon className="icon" />
              <span>Thống kê hóa đơn</span>
            </li>
          </Link>

          <p className="title">Đăng xuất</p>
          <li>
            <Button onClick={handleLogout}>
              <LogoutIcon className="icon" />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
