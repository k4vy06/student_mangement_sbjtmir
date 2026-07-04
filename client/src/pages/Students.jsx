import { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/api";
import { toast } from "react-toastify";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStudents(searchTerm, departmentFilter);
      setStudents(data);
    } catch (error) {
      toast.error(error.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, departmentFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleOpenAddForm = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        toast.success("Student updated successfully");
      } else {
        await addStudent(formData);
        toast.success("Student added successfully");
      }
      setIsFormOpen(false);
      fetchStudents();
    } catch (error) {
      toast.error(error.message || "Failed to save student");
    }
  };

  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    try {
      await deleteStudent(studentToDelete.id);
      toast.success("Student deleted successfully");
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
      fetchStudents();
    } catch (error) {
      toast.error(error.message || "Failed to delete student");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Students</h1>
        <button
          onClick={handleOpenAddForm}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm font-medium"
        >
          <FaPlus className="mr-2" /> Add New Student
        </button>
      </div>

      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        department={departmentFilter} 
        onDepartmentChange={setDepartmentFilter} 
      />

      {loading ? (
        <Spinner />
      ) : students.length === 0 ? (
        <EmptyState message="No students found matching your criteria." />
      ) : (
        <StudentTable
          students={students}
          onEdit={handleOpenEditForm}
          onDelete={handleOpenDeleteModal}
        />
      )}

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        studentName={studentToDelete?.name}
      />
    </div>
  );
};

export default Students;
