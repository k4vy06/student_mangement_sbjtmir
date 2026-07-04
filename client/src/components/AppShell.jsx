import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaBars,
  FaChevronLeft,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChartBar,
  FaHome,
  FaMoon,
  FaSearch,
  FaSun,
  FaTimes,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";

const NAV_LINKS = [
  { name: "Dashboard", path: "/", icon: <FaHome /> },
  { name: "Students", path: "/students", icon: <FaUsers /> },
  { name: "Classes", icon: <FaBookOpen />, disabled: true },
  { name: "Reports", icon: <FaChartBar />, disabled: true },
  { name: "Calendar", icon: <FaCalendarAlt />, disabled: true },
];

const AppShell = ({ children, isDarkMode, onToggleTheme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const closeMobileNav = () => setIsMobileOpen(false);

  return (
    <div className="min-h-screen bg-[#eef5f9] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileNav}
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-gradient-to-b from-[#075fd0] via-[#0759bf] to-[#03459e] text-white shadow-2xl shadow-blue-950/25 transition-all duration-300 ${
          isCollapsed ? "lg:w-20" : "lg:w-72"
        } ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72 lg:translate-x-0"}`}
      >
        <div className="flex min-h-36 flex-col items-center justify-center border-b border-white/10 px-5 py-6">
          <Link to="/" onClick={closeMobileNav} className="flex min-w-0 items-center gap-3">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-white/30 bg-white text-xl font-black text-blue-700 shadow-lg">
              SM
            </span>
            {!isCollapsed && (
              <span className="min-w-0 text-center">
                <span className="mt-3 block truncate text-base font-bold text-white">Student Manager</span>
                <span className="block truncate text-xs font-semibold text-blue-100">MERN Admin Panel</span>
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeMobileNav}
            className="absolute right-4 top-4 rounded-lg p-2 text-blue-100 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) =>
              link.disabled ? (
                <button
                  key={link.name}
                  type="button"
                  title={isCollapsed ? link.name : undefined}
                  className="group flex w-full cursor-default items-center gap-3 border-l-4 border-transparent px-5 py-3.5 text-left text-sm font-semibold text-blue-100/80"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center text-base">{link.icon}</span>
                  {!isCollapsed && <span>{link.name}</span>}
                </button>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMobileNav}
                  title={isCollapsed ? link.name : undefined}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 border-l-4 px-5 py-3.5 text-sm font-semibold transition ${
                      isActive
                        ? "border-white bg-white/16 text-white shadow-inner"
                        : "border-transparent text-blue-100 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center text-base">{link.icon}</span>
                  {!isCollapsed && <span>{link.name}</span>}
                </NavLink>
              )
            )}
          </nav>

          {!isCollapsed && (
            <div className="mx-5 mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">Live Records</p>
              <p className="mt-2 text-sm leading-6 text-blue-50">
                Efficiency is the foundation of excellence.
              </p>
            </div>
          )}
        </div>

        <div className="hidden border-t border-white/10 p-4 lg:block">
          <button
            type="button"
            onClick={() => setIsCollapsed((value) => !value)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
          >
            <FaChevronLeft className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setIsMobileOpen(true)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
              >
                <FaBars />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                  {location.pathname === "/students" ? "Student Records" : "Student Management Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative hidden sm:block">
                <span className="sr-only">Search</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-11 w-56 rounded-full border border-slate-200 bg-slate-100 pl-5 pr-12 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white md:w-72"
                />
                <span className="absolute right-0 top-0 grid h-11 w-12 place-items-center border-l border-slate-300 text-slate-500 dark:border-slate-700">
                  <FaSearch />
                </span>
              </label>

              <button
                type="button"
                aria-label="Notifications"
                className="relative grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300"
              >
                <FaBell />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
              </button>

              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={onToggleTheme}
                className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300"
              >
                {isDarkMode ? <FaSun className="text-amber-300" /> : <FaMoon />}
              </button>

              <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                <FaUserCircle className="text-xl" />
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
