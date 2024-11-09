import express from "express";
import dotenv from "dotenv";
import router from "./router/index.ts";
import { validateEnv } from "./utils/validateEnv.ts";


dotenv.config();
validateEnv();
const app = express();
const PORT = process.env.PORT ?? 5555;

app.use(express.json());
app.use(router);
app.listen(PORT, (): void => {
    console.log(`Listening at port ${PORT}`);
})