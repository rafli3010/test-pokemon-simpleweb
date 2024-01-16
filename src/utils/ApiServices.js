import axios from "axios";

const API_BASE_URL = `https://pokeapi.co/api/v2/pokemon`; // Ganti dengan URL API yang sesuai

const ApiService = axios.create({
  baseURL: API_BASE_URL,
});
export default ApiService;
