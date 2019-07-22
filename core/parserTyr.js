var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();

//var filename = 'files/tyr for parse.xlsx';
var qtySizeRange = {};  // size and qty storage

function tyrParser(Sourcefilename, callback) {
    //var datafile = fs.createWriteStream('output/TYR-inventory.csv');
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "TYR-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {

            dataFile.write('Product Name,Product Number,Color Code,Color,Season,Retail,Wholesale,Size,UPC,Qty\n');

            workbook.eachSheet(function(worksheet, sheetId) {

                worksheet.eachRow(function(row, rowNumber) {

                    if (row.values[10] === undefined && row.values[11] === undefined ) {
                        qtySizeRange.size = row.values;
                    }
                    if (row.values[10] === 'Immed' && row.values[11] === undefined ) {
                        qtySizeRange.qty = row.values;
                    }

                    if (row.values[10] === undefined && row.values[11] === 'UPCs') {
                        for (let i = 12; i < 35; i ++) {
                            if (row.values[i] !== undefined) {
                                //console.log(row.values[3] + ',' + row.values[4] + ',' + row.values[7] + ',' + row.values[8] + ',' + qtySizeRange.size[i] + ',' + row.values[i] + ',' + qtySizeRange.qty[i] + '\n');
                                //dataFile.write(row.values[3] + ',' + row.values[4] + ',' + row.values[7] + ',' + row.values[8] + ',' + qtySizeRange.size[i] + ',' + row.values[i] + ',' + qtySizeRange.qty[i] + '\n');
                                dataFile.write(row.values[2] + ',' + row.values[3] + ',' + row.values[4] + ',' + row.values[5] + ',' + row.values[6] + ',' + row.values[8] + ',' + row.values[9] + ',' + qtySizeRange.size[i] + ',' + row.values[i] + ',' + qtySizeRange.qty[i] + '\n');
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

module.exports = tyrParser;
