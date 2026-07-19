import axios from "axios";

const API = "http://localhost:5000/api/profile";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get Profile
export const getProfile = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const response = await axios.put(API, profileData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};