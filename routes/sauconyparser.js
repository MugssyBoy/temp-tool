var express = require('express');
var router = express.Router();
var multer  = require('multer');
var sauconyParser = require("./../core/parserSaucony");

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/files/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('sauconyFile');

router.get('/', function(req, res, next) {
  res.render('saucony', { title: 'Saucony Parser' });
});

router.post('/', upload, function (req, res, next){
    console.log(req.file);
    var ff = req.file.originalname;
    console.log('saucony was here');
    
    sauconyParser(req.file.filename, function(file){
        setTimeout(function() {
            res.render('success', { 
                                fname: file,
                                rName: '/sauconyParser'
                              });
   });
        }, 1500);
       
   
});

module.exports = router;
