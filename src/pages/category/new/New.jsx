import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createCategory, getAlls } from "../../../store/category/categorySlice";

const NewCategory = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAddCategory = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const categoryData = {
      name: data.get("name"),
    };
    dispatch(createCategory(categoryData));
    setName("");
    navigate("/categories");
    dispatch(getAlls());
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/categories");
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAddCategory} method="post">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Tên Loại"
                  name="name"
                  id="name"
                  placeholder="Nhập Tên Loại"
                  variant="standard"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
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

export default NewCategory;
