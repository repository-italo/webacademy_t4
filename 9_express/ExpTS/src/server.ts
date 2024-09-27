import express from "express";
import { Request, Response } from "express";
import { validateEnv } from "./utils/validateEnv";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger";
import { router } from "./router/router";
import { engine } from "express-handlebars";

dotenv.config();
validateEnv();
const app = express();

const PORT = process.env.PORT ?? 5566
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded({extended: false}))
app.use(router);
app.use(logger("complete"));
app.get("/about", (req: Request, res: Response) => {
   res.send("About Page")
});
 
app.listen(PORT, () => {
   console.log(`Listening in port ${PORT}`)
})