import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="relative p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FaTimes size={16} />
          </button>

          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900/50">
            <FaExclamationTriangle className="text-2xl" />
          </div>

          <h3 className="text-center text-xl font-black text-slate-950 dark:text-white">
            Delete student record?
          </h3>

          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
            This will permanently remove{" "}
            <span className="font-bold text-slate-950 dark:text-white">{studentName}</span> from the student
            collection. This action cannot be undone.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
            >
              Delete Record
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmationModal;
