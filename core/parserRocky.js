const Excel = require ('exceljs');
const fs = require ('fs');
const workbook = new Excel.Workbook();

function rockyParser(Sourcefilename, callback) {
    
    const file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    const finalFileName = "ROCKY-INVOICE" + resultDate + ".csv";
    const dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Style,Width,Size,Description,Units Shipped,Units Back-Ordered,Unit Price,Extended Price\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(async function(row, rowNumber) {
                    if (row.values[1] !== 'Style' && row.values[3] === undefined && row.values[4] !== undefined && row.values[5] !== undefined && row.values[6] !== undefined && row.values[7] !== undefined && row.values[8] !== undefined && row.values[9] !== undefined) {
                        dataFile.write(row.values[1] + ',' + row.values[2] + ',' + row.values[4] + ',' + row.values[5] + ',' + row.values[6] + ',' + row.values[7] + ',' + row.values[8] + ',' + row.values[9] + '\n');
                    }
                });
            });
            callback(finalFileName);
        }).catch(err => {
            console.log(err.message);
    });
}

module.exports = rockyParser;
