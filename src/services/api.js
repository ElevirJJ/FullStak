import axios from "axios";

const api = axios.create({
    baseURL: "https://cadastro-medicos-57ggn2h5p-elevirs-projects.vercel.app/",
}) 

export default api;