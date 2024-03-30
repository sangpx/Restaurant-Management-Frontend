import "./edit.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { detailDesk, selectDesk, updateDesk } from "../../../store/desk/deskSlice";
import { useEffect, useState } from "react";

const EditDesk = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const desk = useSelector(selectDesk);

  // Dispatch action để lấy chi tiết danh mục khi component được tạo
  useEffect(() => {
    dispatch(detailDesk(id));
  }, [dispatch, id]);

  // Cập nhật trạng thái name khi dữ liệu chi tiết danh mục được lấy về
  useEffect(() => {
    if (desk.name) {
      setName(desk.name);
    }
  }, [desk]);

  const handleUpdateDesk = (event) => {
    event.preventDefault();
    const deskData = {
      id,
      newDesk: { name },
    };
    dispatch(updateDesk(deskData));
    navigate("/desks");
  };

  const handleCancel = (event) => {
    event.preventDefault(event);
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
            <form onSubmit={handleUpdateDesk} method="post">
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

export default EditDesk;
