import { FaBed, FaKey, FaRupeeSign, FaCheckCircle, FaUsers } from 'react-icons/fa';
import MetricCard from '../components/Dashboard/MetricCard/MetricCard';
import MonthlyRevenueChart from '../components/Dashboard/Charts/MonthlyRevenueChart';
import RoomOccupancyChart from '../components/Dashboard/Charts/RoomOccupancyChart';
import FoodSalesChart from '../components/Dashboard/Charts/FoodSalesChart';
import './Dashboard.css';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Total Rooms',
      value: '120',
      icon: FaBed,
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      title: 'Occupied Rooms',
      value: '85',
      icon: FaKey,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: "Today's Revenue",
      value: '₹75,000',
      icon: FaRupeeSign,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: "Today's Check-ins",
      value: '25',
      icon: FaCheckCircle,
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
    {
      title: 'Staff Present',
      value: '18/25',
      icon: FaUsers,
      color: '#6366f1',
      bgColor: '#e0e7ff',
    },
  ];

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            bgColor={metric.bgColor}
          />
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-item">
          <MonthlyRevenueChart />
        </div>
        <div className="chart-item">
          <RoomOccupancyChart />
        </div>
        <div className="chart-item">
          <MonthlyRevenueChart />
        </div>
        <div className="chart-item">
          <FoodSalesChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

