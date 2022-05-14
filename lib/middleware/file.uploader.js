import multer from 'multer';

const PATH = './uploads';
let fileNameSaved = null;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now();
        fileNameSaved = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        req.fileNameSaved = fileNameSaved;
        cb(null, fileNameSaved);
    }
});
let upload = multer({
    storage: storage
});

module.exports = upload;