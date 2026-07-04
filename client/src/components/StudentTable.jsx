import { FaEdit, FaEnvelope, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden bg-white dark:bg-slate-900">
      <div className="max-h-[620px] overflow-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur dark:bg-slate-900/95">
            <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th className="px-5 py-4 font-black">Roll No</th>
              <th className="px-5 py-4 font-black">Student</th>
              <th className="px-5 py-4 font-black">Department</th>
              <th className="px-5 py-4 font-black">Year</th>
              <th className="px-5 py-4 font-black">Email</th>
              <th className="px-5 py-4 text-right font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.025 }}
                className="transition hover:bg-cyan-50/70 dark:hover:bg-cyan-950/20"
              >
                <td className="px-5 py-4 font-black text-slate-700 dark:text-slate-200">{student.rollNo}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-black text-white dark:bg-cyan-500 dark:text-slate-950">
                      {student.name?.slice(0, 1)?.toUpperCase() || "S"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-950 dark:text-white">{student.name}</p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Student record</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300 dark:ring-cyan-900/50">
                    {student.department}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-600 dark:text-slate-300">Year {student.year}</td>
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <FaEnvelope className="text-slate-300 dark:text-slate-600" /> {student.email}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(student)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-300"
                      title="Edit Student"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(student)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
                      title="Delete Student"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
