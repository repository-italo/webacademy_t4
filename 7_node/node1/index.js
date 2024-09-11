const fs = require('fs');
const dotenv = require('dotenv')
const utils = require('./utils/utils.js');
const http = require("http");

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
const PORT = process.env.PORT ?? 3333;

var arquivos = [];
process.argv.forEach((val, index) => {
    if(val.includes("./")){
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
    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8" })
    arquivos.forEach(e => res.write(utils.createLink(e)))
    res.end();
})

server.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});