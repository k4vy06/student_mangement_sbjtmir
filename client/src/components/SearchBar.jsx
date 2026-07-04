import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import { DEPARTMENTS, YEARS } from "../constants";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  year,
  onYearChange,
  onClear,
  resultCount,
}) => {
  const hasFilters = searchTerm || department || year;

  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-3 lg:grid-cols-[1fr_190px_170px_auto]">
        <label className="relative block">
          <span className="sr-only">Search students</span>
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, roll number, email, or department"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:bg-slate-950"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Filter by department</span>
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </label>

        <label className="relative block">
          <span className="sr-only">Filter by year</span>
          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
          >
            <option value="">All Years</option>
            {YEARS.map((yr) => (
              <option key={yr.value} value={yr.value}>
                {yr.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FaTimes size={12} /> Clear
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>Search updates instantly across visible student fields.</span>
        <span>{resultCount} result{resultCount === 1 ? "" : "s"}</span>
      </div>
    </div>
  );
};

export default SearchBar;
