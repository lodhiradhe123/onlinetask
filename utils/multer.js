const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + '-' + path.join(file.originalname))
    } 
});

module.exports = multer({storage: storage})