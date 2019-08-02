var express = require('express');
var router = express.Router();
var multer  = require('multer');
var tyrParser = require("./../core/parserTyr");

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
            }).single('tyrFile');

router.get('/', function(req, res, next) {
  res.render('tyr', { title: 'Tyr Parser' });
});

router.post('/', upload, function (req, res, next){
    //console.log(req.file);
    var ff = req.file.originalname;
    //console.log('tyr was here');
    
    tyrParser(req.file.filename, function(file){
        //console.log(req)
        setTimeout(function() {
            res.render('success', { 
                                fname: file,
                                rName: '/tyrParser'
                              });
   });
        }, 1500);
       
   
});

module.exports = router;
