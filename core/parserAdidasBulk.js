var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();
let data = {};

function adidasBulkParser(Sourcefilename, callback) {

    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "ADIDASBULK-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function () {
            dataFile.write('Style,WD,Size,Dates,Qty,Gender\n');
            workbook.eachSheet(function (worksheet, sheetId) {
                worksheet.eachRow(function (row, rowNumber) {
                    const obj = {};

                    //sizes
                    // if (row.values[10] === 'Wholesale') {
                    //     for (let index = 11; index < 60; index++) {
                    //         if(row.values[index] !== undefined) {
                    //             obj.sizes = row.values[index];
                    //             //console.log(row.values[index])
                    //         }
                    //     }
                    // }

                    // for (let index = 11; index < 60; index++) {
                    //     if (rowNumber == 1 && row.values[index] && row.values[index] !== undefined) {
                    //         //console.log(row.values[index])
                    //         obj.sizes = row.values[index];
                    //     }
                    // }

                    //qty
                    if (row.values[10] !== 'Wholesale') {
                        for (let index = 11; index < 60; index++) {
                            if (row.values && row.values !== undefined) {
                                //obj.qty = row.values[index];
                                console.log(row.values[index]);
                            }
                        }
                    }

                    //qty
                    // if (row.values[9] !== 'Retail' && row.values[10] !== 'Wholesale') {
                    //     for (let index = 11; index < 60; index++) {
                    //         if (row.values[index]) {
                    //             obj.qty = row.values;
                    //             //console.log(obj.sizes + ',' + row.values[index])
                    //         }
                    //     }
                    //     return obj;
                    // }

                    //sizes
                    if (row.values[9] === 'Retail' && row.values[10] === 'Wholesale') {
                        for (let index = 11; index < 60; index++) {
                            if (row.values[index]) {
                                //console.log(obj.qty[index])
                                //obj.sizes = row.values;
                                //console.log(row.values[index] + ',' + obj.qty[])
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

module.exports = adidasBulkParser;
