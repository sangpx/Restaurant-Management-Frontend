import "./new.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { selectAllDesks } from "../../../store/desk/deskSlice";

const NewBooking = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const desks = useSelector(selectAllDesks);
  console.log("desks: ", desks);

  const handleAddDesk = (event) => {
    event.preventDefault();
    console.log("ok");
  };

   const handleCancel = (event) => {
     event.preventDefault();
     navigate("/bookings");
   };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAddDesk} method="post">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Tên khách hàng"
                  name="customerName"
                  id="customerName"
                  placeholder="Nhập Tên khách hàng"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Địa chỉ"
                  name="address"
                  id="address"
                  placeholder="Nhập Địa chỉ"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Số lượng người"
                  name="quantityPerson"
                  id="quantityPerson"
                  placeholder="Nhập Số lượng người"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Số điện thoại"
                  name="phone"
                  id="phone"
                  placeholder="Nhập Số điện thoại"
                  variant="standard"
                />
              </div>
              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="categoryId">Mã bàn</InputLabel>
                  <Select
                    className="input"
                    labelId="categoryId"
                    id="categoryId"
                    label="Quyền"
                    name="categoryId"
                  >
                    <MenuItem value={1}>bàn</MenuItem>
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

export default NewBooking;
