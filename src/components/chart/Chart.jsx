import { useDispatch, useSelector } from "react-redux";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getMonthlyRevenue,
  selectMonthRevenue,
} from "../../store/revenueReport/revenueSlice";
import { useEffect } from "react";

const Chart = ({ aspect, title }) => {
  const dispatch = useDispatch();
  const totalPriceMonthRevenue = useSelector(selectMonthRevenue);

  const data = [
    { name: "Tháng 1", Total: 0 },
    { name: "Tháng 2", Total: 0 },
    { name: "Tháng 3", Total: 0 },
    { name: "Tháng 4", Total: totalPriceMonthRevenue },
    { name: "Tháng 5", Total: 0 },
    { name: "Tháng 6", Total: 0 },
    { name: "Tháng 7", Total: 0 },
    { name: "Tháng 8", Total: 0 },
    { name: "Tháng 9", Total: 0 },
    { name: "Tháng 10", Total: 0 },
    { name: "Tháng 11", Total: 0 },
    { name: "Tháng 12", Total: 0 },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
