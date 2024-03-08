import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {TextField } from "@mui/material";

const NewFloor = ({ title }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleAddUser = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log("ok");
  } 
  
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/floors");
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form method="post">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Tên tầng"
                  id="floor"
                  placeholder="Nhập Tên tầng"
                  variant="standard"
                />
              </div>
              <div className="formButton">
                <button onClick={handleCancel}>Hủy</button>
                <button onClick={handleAddUser}>Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFloor;
