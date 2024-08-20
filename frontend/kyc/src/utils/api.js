import axios from "axios";

const API_URL = "http://localhost:8080/api/";

export const getLogin = (username, password) => axios.post(`${API_URL}auth/login`, { username, password });

export const getCurrentUser = (username) => axios.get(`${API_URL}auth/current-user`);
