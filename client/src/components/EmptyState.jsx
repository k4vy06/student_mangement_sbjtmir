import { FaInbox } from "react-icons/fa";

const EmptyState = ({ message = "No students found." }) => {
  return (
    <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 text-center">
      <FaInbox className="text-gray-300 text-5xl mx-auto mb-4" />
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
