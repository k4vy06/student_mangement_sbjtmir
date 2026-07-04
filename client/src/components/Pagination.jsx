import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ page, totalPages, totalItems, pageSize, onPageChange }) => {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 dark:text-slate-400">
        Showing <span className="font-semibold text-slate-900 dark:text-white">{start}</span> to{" "}
        <span className="font-semibold text-slate-900 dark:text-white">{end}</span> of{" "}
        <span className="font-semibold text-slate-900 dark:text-white">{totalItems}</span> students
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FaChevronLeft size={12} /> Prev
        </button>
        <span className="rounded-lg bg-slate-100 px-3 py-2 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Next <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
