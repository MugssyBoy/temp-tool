var express = require('express');
var router = express.Router();
var multer  = require('multer');

var parserinov = require("./../core/parserinov8");

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
    }).single('inovFile');

/* GET stance page. */
router.get('/', function(req, res, next) {
  res.render('inov', { title: 'Inov 8 Parser' });
});

router.post('/', upload, function (req, res, next){

        setTimeout(function(){
            
            console.log(req.file);
            console.log('inov8 was here');
            
            parserinov8(req.file.filename, function(file){
                res.render('success', {
                    fname: file,
                    rName: '/inovparser'
                });
            }, 1500);
        });
        
});

module.exports = router;