import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { countFoods } from "../../store/food/foodSlice";
import { countUsers } from "../../store/auth/authSlice";

const Widget = ({ type }) => {
  const dispatch = useDispatch();
  const countFood = useSelector(countFoods);
  const countUser = useSelector(countUsers);
  let data;
  let counterValue;

  // Xác định giá trị counter dựa trên loại widget
  if (type === "user") {
    counterValue = countUser;
  } else if (type === "food") {
    counterValue = countFood;
  } else {
    counterValue = "N/A"; // Trường hợp không phù hợp với user hoặc order
  }

  switch (type) {
    case "user":
      data = {
        title: "Nhân viên",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "food":
      data = {
        title: "Món ăn",
        isMoney: false,
        link: "View all foods",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Bàn ăn",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      data = {
        title: "Unknown",
        link: "N/A",
        icon: null,
      };
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{counterValue}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
