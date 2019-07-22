var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();
let data = {};

function batesParser(Sourcefilename, callback) {
    
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "BATES-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Style,WD,Size,Dates,Qty,Gender\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {
                    
                    if (row.values[9] === 'Next Available Date') {
                        for (let index = 10; index < 40; index++) {
                            data.sizeRange = row.values;
                        }
                    }

                    if (row.values[9] !== 'Next Available Date') {
                        for (let index = 10; index < 40; index++) {
                            if (row.values[index]) {
                                data.qtyRange = row.values;
                            }
                        }
                    }

                    if (row.values[9] !== 'Next Available Date') {
                        for (let index = 10; index < 40; index++) {
                            if (row.values[index] && row.values[8] !== undefined) {
                                console.log(row.values[4] + ',' + row.values[8] + ',' + data.sizeRange[index] + ',' + row.values[9] + ',' + data.qtyRange[index] + ',' + row.values[3] + '\n');
                                dataFile.write(row.values[4] + ',' + row.values[8] + ',' + data.sizeRange[index] + ',' + row.values[9] + ',' + data.qtyRange[index] + ',' + row.values[3] + '\n');
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

module.exports = batesParser;