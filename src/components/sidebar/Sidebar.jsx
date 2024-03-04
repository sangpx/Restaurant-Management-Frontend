import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RuleIcon from "@mui/icons-material/Rule";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DiscountIcon from "@mui/icons-material/Discount";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import TableChartIcon from "@mui/icons-material/TableChart";
import InfoIcon from "@mui/icons-material/Info";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";


import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
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
          <li>
            <HomeOutlinedIcon className="icon" />
            <span>Trang Chủ</span>
          </li>

          <p className="title">Quản lý hệ thống</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Quản lý Người dùng</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <RuleIcon className="icon" />
              <span>Quản lý Quyền</span>
            </li>
          </Link>
          <li>
            <CategoryIcon className="icon" />
            <span>Quản lý Loại món ăn</span>
          </li>
          <li>
            <FastfoodIcon className="icon" />
            <span>Quản lý Món ăn</span>
          </li>
          <li>
            <TableChartIcon className="icon" />
            <span>Quản lý Tầng/khu</span>
          </li>
          <li>
            <TableRestaurantIcon className="icon" />
            <span>Quản lý Bàn ăn</span>
          </li>
          <li>
            <DiscountIcon className="icon" />
            <span>Quản lý Khuyến mại</span>
          </li>
          <li>
            <ContactPageIcon className="icon" />
            <span>Quản lý Khách hàng</span>
          </li>
          <li>
            <InfoIcon className="icon" />
            <span>Quản lý thông tin</span>
          </li>
          <p className="title">Quản lý đặt bàn</p>
          <li>
            <PersonOutlinedIcon className="icon" />
            <span>Thêm yêu cầu đặt bàn</span>
          </li>
          <p className="title">Quản lý thanh toán</p>
          <li>
            <ReceiptIcon className="icon" />
            <span>Lập hóa đơn</span>
          </li>

          <p className="title">Báo cáo thống kê</p>
          <li>
            <AssessmentIcon className="icon" />
            <span>Thống kê DT theo ngày</span>
          </li>
          <li>
            <AssessmentIcon className="icon" />
            <span>Thống kê DT theo tháng</span>
          </li>
          <li>
            <AssessmentIcon className="icon" />
            <span>Thống kê hóa đơn</span>
          </li>

          <p className="title">Đăng xuất</p>
          <li>
            <LogoutIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
