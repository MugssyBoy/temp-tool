var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();
let dataArr = [];

function baffinParser(Sourcefilename, callback) {
    
    //var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    //var finalFileName = "BATES-ATS" + resultDate + ".csv";
    //var dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('./public/files/uploads/' + Sourcefilename)
        .then(function() {
            //dataFile.write('Style,WD,Size,Dates,Qty,Gender\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(async function(row, rowNumber) {

                    let size = await getSizes(row);
                    console.log(size);
                    
                    // console.log(JSON.stringify(row.values));
                    // if (row.values[2] && row.values[2] !== 'Product #' && row.values[3] === undefined && row.values[1] !== undefined) {
                    //     let ret = row.values[2].replace('Sizes/Units: ', '')
                    //     console.log(ret);
                    //     dataArr.push(ret);
                    //     console.log(dataArr)
                    //     console.log('typeof', typeof dataArr);
                    //     console.log('length', dataArr.length);
                    // }
                    // console.log(dataArr);
                    
                });
            });
            //callback(finalFileName);
        }).catch(err => {
            console.log(err.message);
    });
}

module.exports = baffinParser;


function getSizes(row) {
    if (row.values[2] && row.values[2] !== 'Product #' && row.values[3] === undefined && row.values[1] !== undefined) {
        let ret = row.values[2].replace('Sizes/Units: ', '');
        dataArr.push(ret);
    }
    return dataArr;
}