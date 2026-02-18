import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaBuilding, FaHome, FaUserCheck, FaHotel, FaUtensils, FaWallet, FaBoxes, FaBroom, FaGlassCheers, FaChartBar, FaCog, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

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

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/') {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div className="sidebar ">
      <div className="sidebar-header">
        <FaBuilding className="sidebar-logo" />
        <h2>Hotel Management System</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <Icon className="nav-icon" />
              <span className="nav-text">{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <FaThumbsUp className="footer-icon" />
        <FaThumbsDown className="footer-icon" />
      </div>
    </div>
  );
};

export default Sidebar;

