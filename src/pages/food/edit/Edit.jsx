import "./edit.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlls,
  selectAllCategories,
} from "../../../store/category/categorySlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  detailFood,
  selectFood,
  updateFood,
} from "../../../store/food/foodSlice";

const EditFood = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const food = useSelector(selectFood);
  const [newFood, setNewFood] = useState({});
  const categories = useSelector(selectAllCategories);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Dispatch action để lấy chi tiết danh mục khi component được tạo
  useEffect(() => {
    dispatch(detailFood(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (food) {
      setNewFood({
        name: food.name,
        description: food.description,
        price: food.price,
      });
      setSelectedCategory(food.categoryId);
    }
  }, [food]);

  //get Alls Categories
  useEffect(() => {
    dispatch(getAlls());
  }, [dispatch]);

  const handleInputChange = useCallback((e) => {
    setNewFood((prevNewFood) => ({
      ...prevNewFood,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleUpdateFood = async (event) => {
    event.preventDefault();
    await dispatch(
      updateFood({ id: id, categoryId: selectedCategory, newFood })
    );
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
            <form onSubmit={handleUpdateFood} method="post">
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
                <button type="submit">Chỉnh sửa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFood;
