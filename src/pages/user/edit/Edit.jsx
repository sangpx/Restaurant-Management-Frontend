import "./edit.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  detailUser,
  getAllRoles,
  getAlls,
  selectUser,
  updateUser,
} from "../../../store/auth/authSlice";

const EditUser = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(detailUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setNewUser({
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = (event) => {
    event.preventDefault(event);
    const userData = {
      ...newUser,
    };
    dispatch(updateUser({ id, newUser: userData }));
    setNewUser({
      username: "",
      email: "",
      password: "",
      phone: "",
    });
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
            <form onSubmit={handleUpdateUser} method="post">
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

              {/* <div className="formInput">
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
                          {role.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div> */}

              <div className="formButton">
                <button onClick={handleCancel}>Hủy</button>
                <button type="submit">Chỉnh sửa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
