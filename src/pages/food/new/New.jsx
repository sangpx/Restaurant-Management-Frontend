import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCategories,
  getAlls,
} from "../../../store/category/categorySlice";
import { createFood } from "../../../store/food/foodSlice";
import { useCallback } from "react";

const NewFood = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlls());
  }, [dispatch]);

  const categories = useSelector(selectAllCategories);
  // State để lưu category đã chọn
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newFood, setNewFood] = useState({});

  const handleInputChange = useCallback((e) => {
    setNewFood((prevNewFood) => ({
      ...prevNewFood,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddFood = (event) => {
    event.preventDefault();
    dispatch(createFood({ categoryId: selectedCategory, newFood }));
    setNewFood({});
    navigate("/foods");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/foods");
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
            <form onSubmit={handleAddFood} method="post">
              <div className="formInput">
                <TextField
                  className="input"
                  label="Tên Món ăn"
                  name="name"
                  id="name"
                  placeholder="Nhập Tên Món ăn"
                  variant="standard"
                  value={newFood.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Mô tả"
                  name="description"
                  id="description"
                  placeholder="Nhập Mô tả"
                  variant="standard"
                  value={newFood.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <TextField
                  className="input"
                  label="Giá"
                  name="price"
                  id="price"
                  placeholder="Nhập Giá"
                  variant="standard"
                  value={newFood.price || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="categoryId">Loại món ăn</InputLabel>
                  <Select
                    className="input"
                    labelId="categoryId"
                    id="categoryId"
                    label="Quyền"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    name="categoryId"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
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

export default NewFood;
