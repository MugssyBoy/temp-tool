var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();
let data = {};

function sauconyParser(Sourcefilename, callback) {
    
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "SAUCONY-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Style,Width,Size,Qty,Availability,Price,Description\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {
                    
                    if (row.values[5] === 'Next Available') {
                        for (let index = 6; index < 30; index++) {
                            data.sizeRange = row.values;
                        }
                    }

                    if (row.values[5] !== 'Next Available') {
                        for (let index = 6; index < 30; index++) {
                            if (row.values[index]) {
                                data.qtyRange = row.values;
                            }
                        }
                    }

                    if (row.values[5] !== undefined && row.values[5] !== 'Next Available') {
                        for (let index = 6; index < 30; index++) {
                            if (row.values[index]) {
                                dataFile.write(row.values[2] + ',' + row.values[3] + ',' + data.sizeRange[index] + ',' + data.qtyRange[index] + ',' + row.values[5] + ',' + row.values[4] + ',' + row.values[1] + '\n');
                            }
                        }
                    }
                    
                });
            });
            callback(finalFileName);
        }).catch(err => {
            console.log(err.message);
    });
}

module.exports = sauconyParser;