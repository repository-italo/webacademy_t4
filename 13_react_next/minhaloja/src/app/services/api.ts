import axios from "axios";

const api = axios.create({
   baseURL: "https://ranekapi.origamid.dev/json/api"
})

const apiFavoritos = axios.create({
   baseURL: "https://fair-walnut-carpenter.glitch.me"
})

export {api, apiFavoritos};