import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.css';

const MonthlyRevenueChart = () => {
  const data = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 105000 },
    { month: 'Apr', revenue: 98000 },
    { month: 'May', revenue: 115000 },
    { month: 'Jun', revenue: 125000 },
    { month: 'Jul', revenue: 135000 },
    { month: 'Aug', revenue: 140000 },
    { month: 'Sep', revenue: 145000 },
  ];

  return (
    <div className="chart-container mt-10 h-50 w-90">
      <h3 className="chart-title">Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#fbbf24" 
            strokeWidth={3}
            dot={{ fill: '#fbbf24', r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;

