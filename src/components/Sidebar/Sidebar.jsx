import { useNavigate, useLocation } from 'react-router-dom';
import {
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

const Sidebar = ({ isOpen, onNavigate }) => {

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

  const handleNavClick = (path) => {
    navigate(path);
    onNavigate(); // 🔥 sidebar auto close
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div
      className={`
        fixed top-16 left-0
        h-[calc(100vh-64px)] w-64
        bg-slate-800 text-white z-50
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >

      <nav className="h-full flex flex-col justify-between px-4 py-4">

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-lg
                  cursor-pointer font-semibold transition
                  hover:bg-white/10
                  ${isActive(item.path) ? 'bg-blue-500' : ''}
                `}
              >
                <Icon />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-around border-t border-white/10 pt-4">
          <FaThumbsUp className="cursor-pointer hover:text-green-400" />
          <FaThumbsDown className="cursor-pointer hover:text-red-400" />
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;
