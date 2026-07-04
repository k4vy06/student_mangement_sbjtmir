import { FaSearch, FaFilter } from "react-icons/fa";
import { DEPARTMENTS } from "../constants";

const SearchBar = ({ searchTerm, onSearchChange, department, onDepartmentChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-56 relative">
        <FaFilter className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
