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
  FaCog
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const menuItems = [
    { id: 1, name: 'Dashboard', icon: FaHome, path: '/dashboard' },

    ...(role === "admin"
      ? [
          { id: 2, name: 'Attendance', icon: FaUserCheck, path: '/attendance' },
          { id: 3, name: 'Hotel', icon: FaHotel, path: '/hotel' },
          { id: 4, name: 'Restaurant POS', icon: FaUtensils, path: '/restaurant' },
          { id: 5, name: 'Accounts', icon: FaWallet, path: '/accounts' },
          { id: 6, name: 'Inventory', icon: FaBoxes, path: '/inventory' },
          { id: 7, name: 'Housekeeping', icon: FaBroom, path: '/housekeeping' },
          { id: 8, name: 'Banquet', icon: FaGlassCheers, path: '/banquet' },
          { id: 9, name: 'Reports', icon: FaChartBar, path: '/reports' },
          { id: 10, name: 'Settings', icon: FaCog, path: '/settings' },
        ]
      : []),
  ];

  const handleNavClick = (path) => navigate(path);
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="
      fixed top-[70px] left-0
      w-[250px] h-[calc(100vh-70px)]
      flex flex-col justify-between
      text-white
      bg-gradient-to-b from-indigo-400 via-blue-400 to-purple-400
      shadow-2xl rounded-r-3xl
    "
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6">
        <FaBuilding className="text-2xl" />
        <h2 className="text-xl font-bold">Hotel</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-xl
                cursor-pointer transition-all duration-300
                ${
                  isActive(item.path)
                    ? 'bg-white/20 backdrop-blur-md shadow-lg'
                    : 'hover:bg-white/10'
                }
              `}
            >
              <Icon className="text-lg" />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-6 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
            👤
          </div>
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs opacity-70">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;