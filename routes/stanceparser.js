var express = require('express');
var router = express.Router();
var multer  = require('multer');

var stanceParser = require("./../core/parserStance");

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/files/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

//multer settings
var upload = multer({
    storage: storage
    }).single('stanceFile');

/* GET stance page. */
router.get('/', function(req, res, next) {
  res.render('stance', { title: 'Stance Parser' });
});

router.post('/', upload, function (req, res, next){
    
    console.log(req.file);
    console.log('stance was here');
    
    stanceParser(req.file.filename, function(file){
       
       res.render('success', {
           fname: file,
           rName: '/stanceparser'
           
       });
   });
});

module.exports = router;
