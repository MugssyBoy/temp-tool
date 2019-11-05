var express = require('express');
var router = express.Router();
var multer = require('multer');

var sperryInvoiceParser = require("./../core/parserSperryInvoice");
var sperryOcParser = require("./../core/parserSperryOC");

//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/files/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

//multer settings
var upload = multer({ storage: storage }).single('sperryFile');

router
    .route('/sperryInvoiceParser')
    .get((req, res) => res.render('sperry_inv', { title: 'Sperry Invoice Parser' }))
    .post((req, res) => {
        setTimeout(function () {

            console.log(req.file);
            //var ff = req.file.originalname;
            console.log('sperry invoice parser was here');

            sperryInvoiceParser(req.file.filename, function (file) {
                res.render('success', {
                    fname: file,
                    rName: '/api/sperryInvoiceParser'
                });
            });
        }, 1500);
    })

router
    .route('/sperryOcParser')
    .get((req, res) => res.render('sperry_oc', { title: 'Sperry OC Parser' }))
    .post((req, res) => {
        setTimeout(function () {

            console.log(req.file);
            //var ff = req.file.originalname;
            console.log('sperry oc parser was here');
    
            sperryOcParser(req.file.filename, function (file) {
                res.render('success', {
                    fname: file,
                    rName: '/api/sperryOcParser'
                });
            });
        }, 1500);
    })

module.exports = router;