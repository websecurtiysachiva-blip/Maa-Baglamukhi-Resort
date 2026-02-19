import { useNavigate } from 'react-router-dom';

const Header = ({ setIsAuthenticated }) => {
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
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-white shadow-md flex items-center justify-between px-6 z-50">

      <h1 className="text-lg font-semibold">
        Hotel Management System
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          Welcome, {userName}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>

    </header>
  );
};

export default Header;
