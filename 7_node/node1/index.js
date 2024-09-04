const fs = require('fs')
var arquivos = [];
process.argv.forEach((val, index) => {
    if(index > 1){
        fs.readdir(val, (err, files) => {
            if(err){
                console.log(err)
            }else{
                files.forEach((file) => {
                    arquivos.push(file);
                })
            }

        })
    }
})

const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8" })
    arquivos.forEach((e) => {
        res.write(e);
        res.write('<br>')
    })
    res.end();
})

server.listen(5333);