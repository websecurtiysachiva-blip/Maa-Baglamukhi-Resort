import { useNavigate } from 'react-router-dom';
import { FaBars, FaEllipsisH } from 'react-icons/fa';
import './Header.css';

const Header = ({ setIsAuthenticated, toggleSidebar }) => {
  const navigate = useNavigate();

  // Get user info from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.username || 'User';

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');

    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }

    navigate('/login');
  };

  // Horizontal icon function
  const handleMoreOptions = () => {
    alert('More options clicked');
    // Future: yahan dropdown / profile / settings add kar sakte ho
  };

  return (
    <header className="header">
      <div className="header-content">

        {/* ☰ Hamburger Icon */}
        <FaBars
          className="menu-icon"
          onClick={toggleSidebar}
        />

        <div className="header-right">
          <span className="welcome-text">
            Welcome, {userName}
          </span>

          {/* ⋯ Horizontal Icon */}
          <FaEllipsisH
            className="more-icon"
            onClick={handleMoreOptions}
          />

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
