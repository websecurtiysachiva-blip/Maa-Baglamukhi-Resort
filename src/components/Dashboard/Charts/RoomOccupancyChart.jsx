import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './Charts.css';

const RoomOccupancyChart = () => {
  const data = [
    { name: 'Occupied', value: 85, color: '#10b981' },
    { name: 'Available', value: 28, color: '#3b82f6' },
    { name: 'In Cleaning', value: 7, color: '#f59e0b' },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="chart-container h-10 w-90 mt-10">
      <h3 className="chart-title">Room Occupancy</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            verticalAlign="middle" 
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingLeft: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoomOccupancyChart;

