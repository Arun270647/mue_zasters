import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, User, LogOut } from 'lucide-react';
import { isAuthenticated, removeToken, getUserRole } from '../utils/auth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const getDashboardPath = () => {
    switch (userRole) {
      case 0: return '/admin/dashboard';
      case 1: return '/artist/dashboard';
      case 2: return '/user/dashboard';
      default: return '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-purple-600 font-bold text-xl">
              <Music className="w-8 h-8" />
              <span>EventTune</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {authenticated ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/apply"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    I'm an Artist
                  </Link>
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>
    </div>
  );
};

export default Layout;