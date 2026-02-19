import { FaBed, FaKey, FaRupeeSign, FaCheckCircle, FaUsers } from 'react-icons/fa';
import MetricCard from '../components/Dashboard/MetricCard/MetricCard';
import NewDash from "../components/Dashboard/NewDash/NewDash";
import HomePage from '../components/HomePage/HomePage';

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
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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


      {/* Homepage Section */}
      <div className="mt-8">
        <HomePage />
      </div>


      {/* Restaurant Overview */}
      <div className="mt-8">
        <NewDash />
      </div>



      {/* 🔥 Image Section (Your Screenshot Style) */}
      <div className="mt-10">
        <div className="bg-[#0b1e2d] rounded-3xl p-6 shadow-lg flex justify-center items-center">

          <img
            src="https://cdn.dribbble.com/userupload/20647843/file/original-5b27623eb8f2facdb7efbeb8bf169098.png?resize=1600x1200"
            alt="Dashboard Features"
            className="w-screen h-screen max-w-6xl rounded-2xl object-cover"
          />

        </div>
      </div>



      {/* Extra Content Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Room 101 — Rahul Sharma</span>
              <span className="text-green-600 font-medium">Checked In</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Room 204 — Aman Verma</span>
              <span className="text-yellow-600 font-medium">Pending</span>
            </div>

            <div className="flex justify-between">
              <span>Room 305 — Priya Singh</span>
              <span className="text-blue-600 font-medium">Booked</span>
            </div>
          </div>
        </div>


        {/* Staff Activity */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">Staff Activity</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Housekeeping Completed</span>
              <span className="font-semibold">12 Rooms</span>
            </div>

            <div className="flex justify-between">
              <span>Maintenance Requests</span>
              <span className="font-semibold">3 Pending</span>
            </div>

            <div className="flex justify-between">
              <span>Staff Present</span>
              <span className="font-semibold">18/25</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
