const fs = require('fs')


function createLink (filename){
    return `<a href="/${filename}">${filename}</a> <br>`;
}
module.exports = {createLink}