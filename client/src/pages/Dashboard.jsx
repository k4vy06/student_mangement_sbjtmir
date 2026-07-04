import { useState, useEffect } from "react";
import { FaUsers, FaBuilding, FaGraduationCap } from "react-icons/fa";
import { getStats } from "../services/api";
import { toast } from "react-toastify";
import DashboardCard from "../components/DashboardCard";
import Spinner from "../components/Spinner";
import { ContainerScroll } from "../components/ContainerScrollAnimation";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getStats();
      setStats({
        totalStudents: data.totalStudents || 0,
        totalDepartments: data.totalDepartments || 0,
      });
    } catch (error) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Container Scroll Hero Section */}
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Student Management <br />
              <span className="text-blue-600">System</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Manage student records efficiently using the MERN Stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/students"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                View Students
              </Link>
              <Link
                to="/students" // Since Add Student is a modal in the Students page, we'll route there for now.
                state={{ openAddModal: true }}
                className="px-8 py-3 bg-white text-blue-600 border border-blue-200 font-medium rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
              >
                Add Student
              </Link>
            </div>
          </div>
        }
      >
        <img
          src="/dashboard-preview.png"
          alt="Dashboard Preview"
          className="w-full h-full object-cover rounded-xl md:rounded-2xl"
          draggable={false}
        />
      </ContainerScroll>

      {/* Existing Dashboard Stats */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard 
              title="Total Students" 
              value={stats.totalStudents} 
              icon={<FaUsers className="text-blue-600" />} 
              bgColor="bg-blue-100"
            />
            <DashboardCard 
              title="Departments" 
              value={stats.totalDepartments} 
              icon={<FaBuilding className="text-green-600" />} 
              bgColor="bg-green-100"
            />
            <DashboardCard 
              title="Active Programs" 
              value="UG/PG" 
              icon={<FaGraduationCap className="text-purple-600" />} 
              bgColor="bg-purple-100"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Welcome to Student Manager</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            This system allows you to manage student records efficiently. Navigate to the "Students" 
            tab to view, add, edit, or remove students from the database. The interface is designed 
            to be simple, clean, and intuitive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
