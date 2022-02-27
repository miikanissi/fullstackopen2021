import axios from "axios";
require("dotenv").config();

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default apiClient;
