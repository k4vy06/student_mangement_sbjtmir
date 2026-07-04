import { FaEdit, FaTrash } from "react-icons/fa";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Roll No</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 font-semibold">Year</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{student.rollNo}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{student.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide">
                    {student.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">Year {student.year}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
                <td className="px-6 py-4 flex justify-center space-x-3">
                  <button
                    onClick={() => onEdit(student)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    title="Edit Student"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(student)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                    title="Delete Student"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
