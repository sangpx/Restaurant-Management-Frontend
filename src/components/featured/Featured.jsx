import "./featured.scss";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyRevenue,
  getTodayRevenue,
  selectMonthRevenue,
  selectTodayRevenue,
} from "../../store/revenueReport/revenueSlice";
import { useEffect, useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import { countFoods, getCountFood } from "../../store/food/foodSlice";

const Featured = () => {
  const dispatch = useDispatch();

  const totalPriceTodayRevenue = useSelector(selectTodayRevenue);
  const totalPriceMonthRevenue = useSelector(selectMonthRevenue);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    dispatch(getTodayRevenue());
    dispatch(getMonthlyRevenue({ year, month }));
    dispatch(getMonthlyRevenue({ year, month }));
  }, [dispatch]);

  const handeGetPriceMonthRevenue = () => {};

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng doanh thu</h1>
      </div>
      <div className="bottom">
        <div>
          <Select value={year} onChange={handleChangeYear}>
            {/* Add options for years */}
            {Array.from({ length: 10 }, (_, index) => (
              <MenuItem key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </MenuItem>
            ))}
          </Select>
          <Select value={month} onChange={handleChangeMonth}>
            {/* Add options for months */}
            {Array.from({ length: 12 }, (_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handeGetPriceMonthRevenue}>Xem</Button>
        </div>
        <p className="title">Tổng doanh thu tháng</p>
        <div className="itemResult positive">
          <div className="resultAmount">{totalPriceMonthRevenue} VNĐ</div>
        </div>

        <div className="summary">
          <div className="item">
            <div className="itemTitle">Doanh thu ngày hôm nay</div>
            <div className="itemResult positive">
              <div className="resultAmount">{totalPriceTodayRevenue} VNĐ</div>
            </div>
          </div>
          {/* <div className="item">
            <div className="itemTitle">Doanh thu tuần nay</div>
            <div className="itemResult positive">
              <div className="resultAmount">0VNĐ</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
