import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getStudents = async (search = "", department = "") => {
  const params = {};
  if (search) params.search = search;
  if (department) params.department = department;

  const { data } = await API.get("/students", { params });
  return data.data;
};

export const getStats = async () => {
  const { data } = await API.get("/students/stats");
  return data.data;
};

export const addStudent = async (studentData) => {
  const { data } = await API.post("/students", studentData);
  return data;
};

export const updateStudent = async (id, studentData) => {
  const { data } = await API.put(`/students/${id}`, studentData);
  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await API.delete(`/students/${id}`);
  return data;
};
