var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();
let sizes = [];
let style = [];
let ship = [];
let width = [];
let price = [];

function smokyMountainInvoiceParser(Sourcefilename, callback) {
    
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "SAUCONY-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Style, Width, Sizes, Price, Ship');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {
                    //style
                    if (row.values[1] && row.values[1] !== 'Style' && row.values[10]) {
                        style = row.values[1]
                    }

                    //width
                    if (row.values[7] !== 'Description' && row.values[10]) {
                        width = row.values[10]
                    }

                    //price
                    if (row.values[1] && row.values[1] !== 'Style' && row.values[10]) {
                        price = row.values[10]
                    }

                    //sizes
                    if (row.values[1] === undefined && row.values[2] !== undefined) {
                        sizes = row.values
                    }
                    
                    //ship
                    if (row.values[1] === 'Shp.' && row.values[2]) {
                        for (let i = 2; i < 10; i++) {
                            if (row.values[i]) {
                                ship = row.values[i];
                                console.log(style + ',' + width + ',' + sizes[i] + ',' + price + ',' + ship);
                                dataFile.write('\n'+style + ',' + width + ',' + sizes[i] + ',' + price + ',' + ship);
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

module.exports = smokyMountainInvoiceParser;