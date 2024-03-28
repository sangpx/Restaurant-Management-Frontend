import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const NewDesk = ({ title }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [name, setName] = useState("");



  const handleAddDesk = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("ok");
  }; 
  
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/desks");
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
            <form onSubmit={handleAddDesk} method="post">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Tên bàn"
                  name="name"
                  id="name"
                  placeholder="Nhập Tên bàn"
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <TextField
                  type="password"
                  className="input"
                  label="Số lượng"
                  name="quantitySeat"
                  id="quantitySeat"
                  placeholder="Nhập số lượng"
                  variant="standard"
                />
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

export default NewDesk;
