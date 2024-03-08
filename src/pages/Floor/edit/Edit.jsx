import "./edit.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";

const EditFloor = ({ title }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleUpdateUser = (event) => {
    event.preventDefault(event);
    console.log("Updated");
  };

  const handleCancel = (event) => {
    event.preventDefault(event);
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
                <button onClick={handleUpdateUser}>Chỉnh sửa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFloor;
