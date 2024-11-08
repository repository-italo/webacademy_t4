import axios from "axios";

const api = axios.create({
   baseURL: "https://ranekapi.origamid.dev/json/api"
})

export const apiFavoritos = axios.create({
   baseURL: "https://nosy-salt-resonance.glitch.me/favoritos"
})

export default api;