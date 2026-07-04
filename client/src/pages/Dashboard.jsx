import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBuilding, FaCalendarAlt, FaGraduationCap, FaUsers } from "react-icons/fa";
import { getStats, getStudents } from "../services/api";
import { toast } from "react-toastify";
import DashboardCard from "../components/DashboardCard";
import { DashboardSkeleton } from "../components/SkeletonLoaders";
import { DEPARTMENTS } from "../constants";

const linePoints = "0,155 58,96 116,120 174,84 232,104 290,38 348,90 406,50 464,78 522,24";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [data, studentData] = await Promise.all([getStats(), getStudents()]);
      setStats({
        totalStudents: data.totalStudents || 0,
        totalDepartments: data.totalDepartments || 0,
      });
      setStudents(studentData || []);
    } catch (error) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const latestStudents = students.slice(-5).reverse();
  const yearCoverage = new Set(students.map((student) => student.year).filter(Boolean)).size;

  const departmentRows = useMemo(() => {
    return DEPARTMENTS.map((dept) => ({
      ...dept,
      count: students.filter((student) => student.department === dept.value).length,
    })).filter((dept) => dept.count > 0);
  }, [students]);

  const donutRows = departmentRows.length
    ? departmentRows
    : [
        { value: "CSE", label: "Computer Science", count: 1 },
        { value: "IT", label: "Information Technology", count: 1 },
        { value: "ECE", label: "Electronics", count: 1 },
      ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-5 pb-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardCard title="Total Students" value={stats.totalStudents} icon={<FaUsers />} trend="+5.2%" />
        <DashboardCard title="Departments" value={stats.totalDepartments} icon={<FaBuilding />} trend="+1.8%" tone="emerald" />
        <DashboardCard title="Active Years" value={yearCoverage || 0} icon={<FaGraduationCap />} trend="+2.4%" tone="cyan" />
        <DashboardCard title="System Readiness" value="94.1%" icon={<FaCalendarAlt />} trend="-0.5%" negative tone="amber" />
      </motion.section>

      <section className="grid gap-5 xl:grid-cols-[1.8fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">Student Enrollment Trends</h2>
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <option>2023-2024</option>
              <option>2024-2025</option>
            </select>
          </div>

          <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-x-12 top-4 bottom-9 flex flex-col justify-between">
              {[400, 300, 200, 100, 0].map((tick) => (
                <div key={tick} className="flex items-center gap-3">
                  <span className="w-7 text-xs font-semibold text-slate-500 dark:text-slate-400">{tick}</span>
                  <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
            <svg className="absolute left-12 right-4 top-4 h-[190px] w-[calc(100%-4rem)]" viewBox="0 0 522 170" preserveAspectRatio="none">
              <defs>
                <linearGradient id="enrollment-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1d72cf" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#1d72cf" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`${linePoints} 522,170 0,170`} fill="url(#enrollment-area)" />
              <polyline points={linePoints} fill="none" stroke="#1268bd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            </svg>
            <div className="absolute bottom-0 left-12 right-4 grid grid-cols-8 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <p className="absolute bottom-0 left-0 right-0 translate-y-7 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
              Enrollment vs. Month
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
        >
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Class Distribution</h2>
          <div className="mt-5 grid place-items-center">
            <div
              className="grid h-44 w-44 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(#075fc8 0 42%, #2d73c8 42% 67%, #5e95d5 67% 82%, #8bb0dc 82% 92%, #c8d8ea 92% 100%)",
              }}
            >
              <div className="h-24 w-24 rounded-full bg-white dark:bg-slate-900" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {donutRows.slice(0, 5).map((dept, index) => (
              <div key={dept.value} className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: ["#075fc8", "#2d73c8", "#5e95d5", "#8bb0dc", "#c8d8ea"][index] }}
                />
                <span>{dept.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Recent Student List</h2>
          <Link to="/students" className="text-sm font-bold text-blue-700 hover:text-blue-800 dark:text-blue-300">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-900 dark:bg-slate-950 dark:text-slate-200">
              <tr>
                <th className="px-5 py-3 font-black">ID</th>
                <th className="px-5 py-3 font-black">Name</th>
                <th className="px-5 py-3 font-black">Year</th>
                <th className="px-5 py-3 font-black">Department</th>
                <th className="px-5 py-3 font-black">Email</th>
                <th className="px-5 py-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {latestStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center font-medium text-slate-500">
                    No student records available.
                  </td>
                </tr>
              ) : (
                latestStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20">
                    <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">{student.rollNo || index + 1001}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                          {student.name?.slice(0, 1)?.toUpperCase() || "S"}
                        </div>
                        <span className="font-semibold text-slate-950 dark:text-white">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700 dark:text-slate-300">{student.year}</td>
                    <td className="px-5 py-4 font-medium text-slate-700 dark:text-slate-300">{student.department}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{student.email}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-800 dark:bg-green-950/40 dark:text-green-300">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default Dashboard;
