import express from "express";
import dotenv from "dotenv";
import router from "./router/index.ts";
import { validateEnv } from "./utils/validateEnv.ts";
import cookieParser = require("cookie-parser");
import { setLangCookie } from "./middlewares/setLangCookie.ts";
import session  from "express-session"
import { v4 as uuid } from "uuid";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";

declare module 'express-session' {
     interface SessionData {
         uid: string;
         userTypeId: string;
  }
}
dotenv.config();
validateEnv();
const app = express();
const PORT = process.env.PORT ?? 5555;
app.use(express.json());
app.use(cookieParser());
app.use(setLangCookie);
app.use(session({
   genid: (req) => uuid(),
   secret: "_yjCfJPn09yl3jh",
   resave: true,
   saveUninitialized: true,
   
}))
app.use(router);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, (): void => {
    console.log(`Listening at port ${PORT}`);
})