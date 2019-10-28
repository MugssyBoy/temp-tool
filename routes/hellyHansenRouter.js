var express = require('express');
var router = express.Router();
var multer  = require('multer');
//var moment = require('moment');
var hellyHansenParser = require("./../core/parserSmokyMountain");

//multers disk storage settings
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/files/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

//multer settings
var upload = multer({ storage: storage }).single('baffinFile');


router.get('/', function(req, res, next) {
  res.render('hellyHansen', { title: 'Helly Hansen Invoice Parser' });
});

router.post('/', upload, function (req, res, next){
    
    setTimeout(function(){
        
        console.log(req.file);
        var ff = req.file.originalname;
        console.log('smoky mountain was here');
        
        hellyHansenParser(req.file.filename, function(file){
            res.render('success', {
                fname: file,
                rName: '/smokymountainparser'
            });
        });
    }, 1500);
    
});

module.exports = router;