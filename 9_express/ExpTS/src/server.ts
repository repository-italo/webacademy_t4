import express from "express";
import { Request, Response } from "express";
import { validateEnv } from "./utils/validateEnv";
import path from "path";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger";
import { router } from "./router/router";
import { engine } from "express-handlebars";
import sass from 'node-sass-middleware'

dotenv.config();
validateEnv();
const app = express();
const PORT = process.env.PORT ?? 5566;

  
app.use("/icons", express.static(path.join(__dirname, "../node_modules/bootstrap-icons/font")));

app.use(sass({
   src: `${__dirname}/../public/scss`,
   dest: `${__dirname}/../public`,
   outputStyle: "compressed",
   prefix: "/css",
  }));

app.use("/css", express.static(path.join(__dirname,`../public` )));

app.engine("handlebars", engine({
   // eslint-disable-next-line @typescript-eslint/no-require-imports
   helpers: require(`${__dirname}/views/helpers/helpers.ts`)
  }));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.urlencoded({extended: false}));
app.use(router);
app.use(logger("complete"));

app.get("/about", (req: Request, res: Response) => {
   return res.send("About Page");
});

 app.get("/", (req: Request, res: Response) => {
   return res.send("Hello World");
 })

app.listen(PORT, () => {
   console.log(`Listening in port ${PORT}`)
})