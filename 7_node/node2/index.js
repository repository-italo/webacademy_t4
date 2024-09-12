import fs from "fs"
import dotenv from "dotenv"
import { createLink } from "./utils/utils.js"
import http from "http"

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
const PORT = process.env.PORT ?? 3333;

var arquivos = [], nomePasta = "";
process.argv.forEach((val, index) => {
    if(val.includes("./")){
      nomePasta = val;
        fs.readdir(val, (err, files) => {
            if(err){
                console.log(err)
            }else{
                files.forEach(file =>  arquivos.push(file));
            }

        })
    }
})


const server = http.createServer((req, res) => {
   const arquivoEscolhido = arquivos.find(e => req.url === `/${e}`)
    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8" })
      if(arquivoEscolhido){
         const text = fs.readFileSync(`./${nomePasta}/${arquivoEscolhido}`)
                        .toString()
                        .replace(/\r\n/g,'<br>')
                        .split('<br>');

         res.write(`<a href="/">Voltar</a>`);
         res.write(`<h1>${arquivoEscolhido}</h1>`);
         text.forEach(p => res.write(`<p>${p}</p>`));
      }else{
         arquivos.forEach((f) => res.write(createLink(f)));
      }
       res.end();
   
   });
   


server.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});