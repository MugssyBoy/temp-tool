var Excel = require ('exceljs');
var fs = require ('fs');
var workbook = new Excel.Workbook();

let obj = {};

let Sourcefilename = 'emu for parse.xlsx';

function emuAustralia(Sourcefilename, callback) {
    
    var file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
    var finalFileName = "EMU-Invoice" + resultDate + ".csv";
    var dataFile = fs.createWriteStream("../public/files/downloads/" + finalFileName);

    workbook.xlsx.readFile('../public/files/uploads/' + Sourcefilename)
        .then(function() {
            dataFile.write('Style,Color,Description,Sizes,Qty,Unit Price\n');
            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {     
                    
                    //style
                    if (row.values[1] && row.values[3] && row.values[4]) {
                        obj.style = row.values[1];
                    }

                    if (row.values[1] && !row.values[2] && row.values[3] && row.values[4]) {
                        obj.color = row.values[3];
                        obj.desc = row.values[4];
                    }

                    //size
                    if (!row.values[1] && !row.values[2] && !row.values[3] && !row.values[11]) {
                        for (let index = 4; index <= 8; index++) {
                            if (row.values[index]) {
                                obj.sizes = row.values;
                            }
                        }
                    }

                    //qty
                    if (!row.values[1] && !row.values[2] && !row.values[3] && row.values[11]) {
                        for (let index = 4; index <= 8; index++) {
                            if (row.values[index]) {
                                dataFile.write(obj.style + ',' + obj.color + ',' + obj.desc + ',' + obj.sizes[index] + ',' + row.values[index] + ',' + row.values[12] + '\n');
                                //console.log(JSON.stringify(obj.style + ',' + obj.color + ',' + obj.desc + ',' + obj.sizes[index] + ',' + row.values[index]) + ',' + row.values[12] + ',' + row.values[13]);
                            }
                        }
                    }



                });
            });
            //callback(finalFileName);
        }).catch(err => {
            console.log(err.message);
    });
}

emuAustralia(Sourcefilename)

//module.exports = emuAustralia;