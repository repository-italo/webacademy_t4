import http from "http"
import fs from "fs/promises"
import dotenv from 'dotenv'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})
const PORT = process.env.PORT ?? 4455;

const html = await fs.readFile("./frontend/index.html", "utf-8");
const javascript = await fs.readFile("./frontend/script.js", "utf-8");
const css = await fs.readFile("./frontend/style.css", "utf-8");
const server = http.createServer((req, res) => {
   res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8" });
   res.write(`<style>${css}</style>`);
   res.write(html);
   res.write(`<script>${javascript}</script>`);
   res.end();
})



server.listen(PORT, () => {
   console.log(`Listening to port ${PORT}`)
})