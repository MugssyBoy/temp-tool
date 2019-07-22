var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();

let inov_8 = {};

function inov(Sourcefilename, callback) {
    
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "Inov8-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Product ID,Size,Qty,Category,Product Type,Color\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {
                    if (row.values[5] && row.values[5] == 'Product ID') {
                        inov_8.sizeRange = row.values;
                    }
                    if (row.values[5] && row.values[5] !== 'Product ID') {
                        inov_8.qtyRange = row.values;
                    }
                    if (row.values[5] && row.values[5] !== 'Product ID') {
                        for (let index = 6; index < 40; index++) {
                            if (row.values[index]) {
                                console.log(row.values[5] + ',' + inov_8.sizeRange[index] + ',' + inov_8.qtyRange[index] + row.values[2] + ' ' +  '\n');
                                dataFile.write(row.values[5] + ',' + inov_8.sizeRange[index] + ',' + inov_8.qtyRange[index] + ',' +  row.values[2] + ',' + row.values[1] + ',' + row.values[3] +  '\n');
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

module.exports = inov;