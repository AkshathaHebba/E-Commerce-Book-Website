const fs = require('fs')
const path = require('path')
const filePath = path.join(`${__dirname}`,'..','data','books.json');
const book = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

exports.getBookList = (req,res,next) =>{
    res.status(200).json({
        status: 'success',
        message: book
    })
}