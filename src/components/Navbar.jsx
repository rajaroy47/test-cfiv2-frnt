import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FiHome, 
  FiLogIn, 
  FiUserPlus, 
  FiLogOut, 
  FiUser, 
  FiChevronDown,
  FiGrid,
  FiSettings,
  FiHelpCircle,
  FiBell
} from "react-icons/fi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import UserDashboard from "../pages/UserDashboard";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
    setIsMobileMenuOpen(false);
  };

  const handleSettingClick = () => {
    navigate("/settings");
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/services", label: "Services", icon: FiGrid },
    { path: "/support", label: "Support", icon: FiHelpCircle },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="mx-auto flex h-16 lg:h-20 w-[92%] max-w-7xl items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
              CFI<span className="text-blue-600 transition-colors group-hover:text-blue-700">V2.0</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <link.icon className="text-lg" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <FiLogIn className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] transition-all duration-200"
                >
                  <FiUserPlus className="text-lg" />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200">
                  <FiBell className="text-xl" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-3 rounded-lg hover:bg-slate-50 p-1.5 transition-all duration-200"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="h-9 w-9 rounded-full object-cover border-2 border-slate-200"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md">
                        {user?.fullName
                          ?.split(" ")
                          ?.map((name) => name[0])
                          ?.slice(0, 2)
                          ?.join("")
                          ?.toUpperCase()}
                      </div>
                    )}
                    <div className="hidden lg:block text-left">
                      <p className="text-xs text-slate-500">Welcome back</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {user?.fullName?.split(" ")[0]}
                      </p>
                    </div>
                    <FiChevronDown
                      className={`hidden lg:block text-slate-400 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                        <div className="flex items-center gap-3">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="h-12 w-12 rounded-full object-cover border-2 border-slate-200"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white">
                              {user?.fullName
                                ?.split(" ")
                                ?.map((name) => name[0])
                                ?.slice(0, 2)
                                ?.join("")
                                ?.toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900">{user?.fullName}</p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={handleDashboardClick}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <FiGrid className="text-lg" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={handleSettingClick}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <FiSettings className="text-lg" />
                          <span>Settings</span>
                        </button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <FiLogOut className="text-lg" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed md:hidden top-16 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-md z-40 animate-in slide-in-from-top-5 duration-300"
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* User Info for Mobile */}
            {user && (
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="h-14 w-14 rounded-full object-cover border-2 border-slate-200"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-md">
                      {user?.fullName
                        ?.split(" ")
                        ?.map((name) => name[0])
                        ?.slice(0, 2)
                        ?.join("")
                        ?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-slate-500">Welcome back</p>
                    <p className="font-semibold text-slate-900 text-lg">{user?.fullName}</p>
                    <p className="text-xs text-slate-500 mt-1">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="flex-1 py-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-6 py-3 text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <link.icon className="text-xl" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {user && (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="w-full flex items-center gap-3 px-6 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <FiGrid className="text-xl" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-6 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <FiSettings className="text-xl" />
                    <span>Settings</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="p-6 border-t border-slate-100 space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiLogIn className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md shadow-blue-600/20 hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUserPlus className="text-lg" />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="p-6 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;