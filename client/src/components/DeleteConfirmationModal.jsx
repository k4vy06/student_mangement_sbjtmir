import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
             <FaTimes size={18} />
          </button>
          
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-5">
            <FaExclamationTriangle className="text-red-600 text-2xl" />
          </div>
          
          <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
            Confirm Deletion
          </h3>
          
          <p className="text-center text-gray-600 mb-8">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{studentName}</span>? This action cannot be undone.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
