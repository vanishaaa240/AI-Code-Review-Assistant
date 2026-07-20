import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/code-review`;

const getToken = () => {
  return localStorage.getItem("token");
};

// Create Review
export const reviewCode = async (reviewData) => {
  const response = await axios.post(API, reviewData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Dashboard Stats
export const getStats = async () => {
  const response = await axios.get(`${API}/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// History
export const getHistory = async () => {
  const response = await axios.get(`${API}/history`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Review
export const deleteReview = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};