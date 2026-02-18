import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  
  // Get user info from localStorage
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
    <header className="header">
      <div className="header-content">
        <div className="header-right">
          <span className="welcome-text">Welcome, {userName}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

