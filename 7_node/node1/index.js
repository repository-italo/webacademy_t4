const fs = require('fs')

process.argv.forEach((val, index) => {
    if(index > 1){
        fs.readdir(val, (err, files) => {
            if(err){
                console.log(err)
            }else{
                console.log(`Arquivos da pasta ${val}:`);
                files.forEach((file) => {
                    console.log(file);
                })
            }

        })
    }
})