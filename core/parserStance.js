var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();

var qtySizeRange = {};

function stanceParser(Sourcefilename, callback) {
    
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "STANCE-ATS" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Product Name,Product Number,Color Code,Color,Gender,Season,PC,Retail,Wholesale,Size,UPC,Qty\n')
            workbook.eachSheet(function(worksheet, sheetId) {

                worksheet.eachRow(function(row, rowNumber) {
                    
                    if (row.values[11] === undefined && row.values[12] === undefined ) {
                    qtySizeRange.size = row.values;
                    }
                    if (row.values[11] === 'Immed' && row.values[12] === undefined ) {
                        qtySizeRange.qty = row.values;
                    }
                    if (row.values[11] === undefined && row.values[12] === 'UPCs') {
                        for (let index = 13; index < 36; index++) {
                            if (row.values[index] !== undefined) {
                                dataFile.write(row.values[2] + ',' + row.values[3] + ',' + row.values[4] + ',' + row.values[5] + ',' + row.values[6] + ',' + row.values[7] + ',' + row.values[8] + ',' +row.values[9] + ',' + row.values[10] + ',' + qtySizeRange.size[index] + ',' + row.values[index] + ',' + qtySizeRange.qty[index] + '\n')
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

module.exports = stanceParser;
