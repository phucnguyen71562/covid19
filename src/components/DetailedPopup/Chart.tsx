import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface ChartProps {
  data: {
    name: string;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
  }[];
}

function Chart(props: ChartProps) {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Deaths"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
        <Area
          type="monotone"
          dataKey="Recovered"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="Confirmed"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
