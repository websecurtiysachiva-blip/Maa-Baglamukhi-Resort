import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Header.css';

const Header = ({ setIsAuthenticated, toggleSidebar }) => {

  const navigate = useNavigate();

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.username || 'User';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');

    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }

    navigate('/login');
  };

  return (
    <header className="fixed top-0  relative left-0 right-0 h-16 bg-white shadow z-50 flex items-center px-4 ">

      {/* LEFT CORNER ICON */}
      <FaBars className="menu-icon" onClick={toggleSidebar} />

      <div className="header-right">
        <span>Welcome, {userName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>

    </header>
  );
};

export default Header;
