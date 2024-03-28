import "./edit.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";

const EditUser = ({ title }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleUpdateUser = (event) => {
    event.preventDefault(event);
    console.log("Updated");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/users");
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
                  label="Tên đăng nhập"
                  id="username"
                  placeholder="Nhập Tên đăng nhập"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  type="password"
                  className="input"
                  label="Mật khẩu"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  type="email"
                  label="Email"
                  id="email"
                  placeholder="Nhập Email"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Số điện thoại"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Giới tính"
                  id="gender"
                  placeholder="Nhập Giới tính"
                  variant="standard"
                />
              </div>

              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="role_label">Quyền</InputLabel>
                  <Select
                    className="input"
                    labelId="role_label"
                    id="demo-select-small"
                    label="Quyền"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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

export default EditUser;
