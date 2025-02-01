import { useState, useContext } from 'react';
import { authContext } from '../context/AuthContext';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(authContext);
  const { dispatch } = useContext(authContext);

  const Logout = () => {
    dispatch({
        type: 'LOGOUT',
    });   
  }
  return (
    <nav className="bg-white shadow-lg fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 6.1H3" strokeLinecap="round"/>
                  <path d="M21 10.1H3" strokeLinecap="round"/>
                  <rect x="3" y="14.1" width="8" height="6" strokeLinecap="round"/>
                  <path d="M16 17.1H21" strokeLinecap="round"/>
                  <path d="M18 14.1V20.1" strokeLinecap="round"/>
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">QuizCrash</span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
                <>
                <a
                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                    Hi {user?.name}
                </a>
                <button
                    onClick={Logout}
                    className="text-gray-700 bg-red-500 px-4 py-2 hover:text-gray-900 rounded-md text-sm font-medium"
                >
                    Logout
                </button>
                </>
            ) : (
                <>
                <a
                    href="/login"
                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                    Register
                </a>
                </>
            )}
            </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a 
              href="/login" 
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </a>
            <a 
              href="/register"  
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;