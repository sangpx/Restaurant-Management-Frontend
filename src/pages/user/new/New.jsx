import "./new.scss";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getAllRoles,
  getAlls,
  selectAllRoles,
} from "../../../store/auth/authSlice";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

const NewUser = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector(selectAllRoles);
  const [selectedRole, setSelectedRole] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: [],
  });

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const getRoleName = (roleName) => {
    switch (roleName) {
      case "ROLE_ADMIN":
        return "Quản lý";
      case "ROLE_RECEPTIONIST":
        return "Lễ tân";
      case "ROLE_CASHIER":
        return "Thu ngân";
      case "ROLE_USER":
        return "Người dùng";
      default:
        return roleName;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleAddUser = (event) => {
    const userData = {
      ...newUser,
      role: [selectedRole],
    };
    dispatch(createUser(userData));
    setNewUser({
      username: "",
      email: "",
      password: "",
      phone: "",
      role: [],
    });
    setSelectedRole("");
    dispatch(getAlls());
    navigate("/users");
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
            <form onSubmit={handleAddUser} method="post">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Tên đăng nhập"
                  name="username"
                  id="username"
                  placeholder="Nhập Tên đăng nhập"
                  variant="standard"
                  value={newUser.username || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <TextField
                  type="password"
                  className="input"
                  label="Mật khẩu"
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  variant="standard"
                  value={newUser.password || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Nhập Email"
                  variant="standard"
                  value={newUser.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Số điện thoại"
                  id="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  variant="standard"
                  value={newUser.phone || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="role">Chức vụ</InputLabel>
                  <Select
                    className="input"
                    labelId="role"
                    id="role"
                    label="Quyền"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    name="role"
                  >
                    {roles &&
                      roles.map((role) => (
                        <MenuItem key={role.name} value={role.name}>
                          {getRoleName(role.name)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>

              <div className="formButton">
                <button onClick={handleCancel}>Hủy</button>
                <button type="submit">Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
