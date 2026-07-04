import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

const normalizeError = (error) => {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again.";

  return new Error(message);
};

const request = async (handler) => {
  try {
    return await handler();
  } catch (error) {
    throw normalizeError(error);
  }
};

export const getStudents = async (search = "", department = "") => {
  const params = {};
  if (search) params.search = search;
  if (department) params.department = department;

  const { data } = await request(() => API.get("/students", { params }));
  return data.data;
};

export const getStats = async () => {
  const { data } = await request(() => API.get("/students/stats"));
  return data.data;
};

export const addStudent = async (studentData) => {
  const { data } = await request(() => API.post("/students", studentData));
  return data;
};

export const updateStudent = async (id, studentData) => {
  const { data } = await request(() => API.put(`/students/${id}`, studentData));
  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await request(() => API.delete(`/students/${id}`));
  return data;
};
