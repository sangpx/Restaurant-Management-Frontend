import "./edit.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { detailCategory, selectCategory, updateCategory } from "../../../store/category/categorySlice";


const EditCategory = ({ title }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector(selectCategory);
  // Dispatch action để lấy chi tiết danh mục khi component được tạo
  useEffect(() => {
    dispatch(detailCategory(id));
  }, [dispatch, id]);

  // Cập nhật trạng thái name khi dữ liệu chi tiết danh mục được lấy về
  useEffect(() => {
    if (category.name) {
      setName(category.name);
    }
  }, [category]);

  const handleUpdateCategory = (event) => {
    event.preventDefault();
    const categoryData = {
      id,
      newCategory: { name },
    };
    dispatch(updateCategory(categoryData));
    navigate("/categories");
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
            <form onSubmit={handleUpdateCategory} method="post">
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
                <button type="submit">Chỉnh sửa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
