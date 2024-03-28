import "./new.scss";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { createUser, getAlls } from "../../../store/auth/authSlice";
import { useState } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

const NewUser = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState([]);
  const [username, setUseName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const roles = [
    { id: 3, name: "receptionist" },
    { id: 4, name: "cashier" },
  ];

  const handleAddUser = (event) => {
    event.preventDefault();
    // const formElement = event.currentTarget; 
    // const data = new FormData(formElement); 
    // const userData = {
    //   username: data.get("username"),
    //   password: data.get("password"),
    //   phone: data.get("phone"),
    //   email: data.get("email"),
    //   gender: data.get("gender"),
    //   role: selectedRole,
    // };
    const userData = {
      username,
      password,
      phone,
      email,
      gender,
      role: selectedRole,
    };
    console.log("userData: ", userData);
    dispatch(createUser(userData));
    navigate("/users");
    dispatch(getAlls());
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/users");
  };

  const handleChange = (event) => {
     setSelectedRole(event.target.value);
    // const { value } = event.target;
    // setSelectedRole(value);
  //  const { options } = event.target;
  //  if (options) {
  //    // Kiểm tra xem options có tồn tại không
  //    const selectedRoles = [];
  //    for (let i = 0; i < options.length; i++) {
  //      if (options[i].selected) {
  //        selectedRoles.push(options[i].value);
  //      }
  //    }
  //    setSelectedRole(selectedRoles); // Lưu trữ mảng các vai trò được chọn
  //  }
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
                  value={username} // Đặt giá trị từ state
                  onChange={(e) => setUseName(e.target.value)}
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
                  value={password} // Đặt giá trị từ state
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={email} // Đặt giá trị từ state
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone} // Đặt giá trị từ state
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Giới tính"
                  id="gender"
                  name="gender"
                  placeholder="Nhập Giới tính"
                  variant="standard"
                  value={gender} // Đặt giá trị từ state
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="role">Quyền</InputLabel>
                  <Select
                    className="input"
                    labelId="role"
                    multiple
                    id="role"
                    label="Quyền"
                    value={selectedRole}
                    onChange={handleChange}
                    name="role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.name}>
                        {role.name}
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
