import { Link, useNavigate } from "react-router-dom";  
import { Search, LogOut, LogIn, UserPlus, Home, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";


export default function Navbar() {
  const navigate = useNavigate();  // Fixed: must be INSIDE the component

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      setIsLoggedIn(!!userData);
      if (userData) setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    // Better than reload — keeps smooth UX
    navigate("/login");
    // Or if you really want full reload:
    // window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-purple-300 bg-white/80 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-11 h-11 bg-linear-to-br from-purple-600 via-pink-500 to-purple-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all transform group-hover:scale-110">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-linear-to-r from-purple-600 via-pink-500 to-purple-400 bg-clip-text text-transparent">
            SocialHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-50 font-semibold transition-all"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-50 font-semibold transition-all"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
        </nav>

        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl border-2 border-purple-600 text-purple-600 font-black hover:bg-purple-100 transition-all hover:scale-105"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-black transition-all shadow-lg hover:shadow-purple-600/50 transform hover:scale-105"
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}