var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();
let data = {};

function hellyHansenParser(Sourcefilename, callback) {
    
    //var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    //var finalFileName = "BATES-ATS" + resultDate + ".csv";
    //var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            //dataFile.write('Style,WD,Size,Dates,Qty,Gender\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {
                    
                    console.log(JSON.stringify(row.values));
                    
                });
            });
            callback(finalFileName);
        }).catch(err => {
            console.log(err.message);
    });
}

module.exports = hellyHansenParser;