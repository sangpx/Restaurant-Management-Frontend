import "./SidebarBooking.scss";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../../store/auth/authSlice";

const SidebarBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout);
    navigate("/signin");
  };

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
          <p className="title">Quản lý Đặt bàn</p>
          <Link to="/bookings" style={{ textDecoration: "none" }}>
            <li>
              <EventNoteIcon className="icon" />
              <span>Đặt bàn</span>
            </li>
          </Link>
          <Link to="/invoices" style={{ textDecoration: "none" }}>
            <li>
              <EventNoteIcon className="icon" />
              <span>Hóa đơn</span>
            </li>
          </Link>
          <p className="title">Đăng xuất</p>
          <li>
            <Button onClick={handleLogout}>
              <LogoutIcon className="icon" />
            </Button>
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarBooking;
