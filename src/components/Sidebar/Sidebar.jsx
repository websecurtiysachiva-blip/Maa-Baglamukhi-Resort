import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaBuilding,
  FaHome,
  FaUserCheck,
  FaHotel,
  FaUtensils,
  FaWallet,
  FaBoxes,
  FaBroom,
  FaGlassCheers,
  FaChartBar,
  FaCog,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, name: 'Dashboard', icon: FaHome, path: '/dashboard' },
    { id: 2, name: 'Attendance', icon: FaUserCheck, path: '/attendance' },
    { id: 3, name: 'Hotel', icon: FaHotel, path: '/hotel' },
    { id: 4, name: 'Restaurant POS', icon: FaUtensils, path: '/restaurant' },
    { id: 5, name: 'Accounts', icon: FaWallet, path: '/accounts' },
    { id: 6, name: 'Inventory', icon: FaBoxes, path: '/inventory' },
    { id: 7, name: 'Housekeeping', icon: FaBroom, path: '/housekeeping' },
    { id: 8, name: 'Banquet', icon: FaGlassCheers, path: '/banquet' },
    { id: 9, name: 'Reports', icon: FaChartBar, path: '/reports' },
    { id: 10, name: 'Settings', icon: FaCog, path: '/settings' },
  ];

  const handleNavClick = (path) => navigate(path);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="
      fixed top-[70px] left-0
      w-[250px] h-[calc(100vh-70px)]
      flex flex-col justify-between
      text-white
      bg-slate-800/60 backdrop-blur-xl
      border-r border-white/10
      shadow-2xl
    ">

      <div className="flex items-center gap-3 p-5 border-b border-white/10">
        <FaBuilding className="text-xl" />
        <h2 className="text-lg font-semibold">Hotel</h2>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-lg
                cursor-pointer transition-all duration-200
                ${
                  isActive(item.path)
                    ? 'bg-blue-600 shadow-md'
                    : 'hover:bg-white/10'
                }
              `}
            >
              <Icon className="text-lg" />
              <span className="text-sm">{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className="flex justify-around p-4 border-t border-white/10">
        <FaThumbsUp className="cursor-pointer text-lg hover:text-blue-400 transition" />
        <FaThumbsDown className="cursor-pointer text-lg hover:text-blue-400 transition" />
      </div>

    </div>
  );
};

export default Sidebar;
