import { Request, Response } from "express";
import { ChangeLanguageDTO } from "./language.types";

function changeLanguage (req: Request, res: Response) {
   /*
   #swagger.summary = 'Inserir Cookie de Idioma.'
   #swagger.parameters = {
      in: 'body',
      schema: {$ref: '#/definitions/ChangeLanguageDTO'}
   }
   */

   const {lang} = req.body as ChangeLanguageDTO;
   res.cookie('lang', lang);
   res.json({lang});
}

export default {changeLanguage};