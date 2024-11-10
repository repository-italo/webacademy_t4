import { Request, Response } from "express";
import { ChangeLanguageDTO } from "./language.types";

function changeLanguage (req: Request, res: Response) {
   const {lang} = req.body as ChangeLanguageDTO;
   res.cookie('lang', lang);
   res.json({lang});
}

export default {changeLanguage};