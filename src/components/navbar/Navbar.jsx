import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const { username } = user;
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Tìm kiếm..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Tiếng Việt
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <span>{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
