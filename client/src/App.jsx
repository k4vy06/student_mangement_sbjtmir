import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppShell from "./components/AppShell";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("student-admin-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("student-admin-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Router>
      <AppShell isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((value) => !value)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </AppShell>
      <ToastContainer position="bottom-right" autoClose={3000} theme={isDarkMode ? "dark" : "light"} />
    </Router>
  );
}

export default App;
