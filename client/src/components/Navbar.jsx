import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaHome, FaUsers } from "react-icons/fa";

const NAV_LINKS = [
  { name: "Dashboard", path: "/", icon: <FaHome /> },
  { name: "Students", path: "/students", icon: <FaUsers /> },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-3">
          <FaGraduationCap className="text-2xl" />
          <span className="font-bold text-xl tracking-wide hidden sm:block">
            Student Manager
          </span>
        </Link>

        <div className="flex space-x-1 sm:space-x-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition
                ${
                  location.pathname === link.path
                    ? "bg-blue-800 text-white"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }
              `}
            >
              {link.icon}
              <span className="hidden sm:inline">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
