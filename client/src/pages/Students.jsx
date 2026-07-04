import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaUsers } from "react-icons/fa";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/api";
import { toast } from "react-toastify";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import { TableSkeleton } from "../components/SkeletonLoaders";

const PAGE_SIZE = 8;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data || []);
    } catch (error) {
      toast.error(error.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 250);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, departmentFilter, yearFilter]);

  useEffect(() => {
    if (location.state?.openAddModal) {
      setEditingStudent(null);
      setIsFormOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        !debouncedSearch ||
        [student.name, student.rollNo, student.email, student.department, student.year]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(debouncedSearch));

      const matchesDepartment = !departmentFilter || student.department === departmentFilter;
      const matchesYear = !yearFilter || student.year === yearFilter;

      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [students, debouncedSearch, departmentFilter, yearFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleOpenAddForm = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      rollNo: formData.rollNo,
      department: formData.department,
      year: formData.year,
      email: formData.email,
    };

    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, payload);
        toast.success("Student updated successfully");
      } else {
        await addStudent(payload);
        toast.success("Student added successfully");
      }
      setIsFormOpen(false);
      setEditingStudent(null);
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

  const clearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setYearFilter("");
  };

  return (
    <div className="space-y-5 pb-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300 dark:ring-cyan-900/50">
            <FaUsers />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Directory
            </p>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Student Records</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700"
        >
          <FaPlus size={13} /> Add Student
        </button>
      </motion.section>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        department={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        year={yearFilter}
        onYearChange={setYearFilter}
        onClear={clearFilters}
        resultCount={filteredStudents.length}
      />

      {loading ? (
        <TableSkeleton />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          title="No students match your filters"
          message="Try clearing search, department, or year filters. You can also add a new student record from here."
          actionLabel="Add Student"
          onAction={handleOpenAddForm}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <StudentTable students={paginatedStudents} onEdit={handleOpenEditForm} onDelete={handleOpenDeleteModal} />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={filteredStudents.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages))}
          />
        </div>
      )}

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStudent(null);
        }}
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
