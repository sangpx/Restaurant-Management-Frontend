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

const Chart = ({ aspect, title }) => {
  const dispatch = useDispatch();
  const totalPriceMonthRevenue = useSelector(selectMonthRevenue);

  const data = [
    { name: "Tháng 1", Total: 1200 },
    { name: "Tháng 2", Total: 2300 },
    { name: "Tháng 3", Total: 2600 },
    { name: "Tháng 4", Total: 2000 },
    { name: "Tháng 5", Total: 2300 },
    { name: "Tháng 6", Total: 2100 },
    { name: "Tháng 7", Total: 2200 },
    { name: "Tháng 8", Total: 2000 },
    { name: "Tháng 9", Total: 2700 },
    { name: "Tháng 10", Total: 2300 },
    { name: "Tháng 11", Total: 2900 },
    { name: "Tháng 12", Total: 2500 },
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
