const fs = require('fs');
const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const dataArray = {};

async function sperryInvoiceParser(Sourcefilename, callback) {
    try {
        const file_name = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const resultDate = file_name.replace(/[^a-zA-Z0-9 ]/g, "");
        const finalFileName = "SperryInvoice-" + resultDate + ".csv";
        const dataFile = fs.createWriteStream("./public/files/downloads/" + finalFileName);

        dataFile.write('Style,Size,Width,Qty,Price\n');

        const wkBk = await workbook.xlsx.readFile(Sourcefilename);
        const wkSht = await wkBk.getWorksheet(1);
        
        await wkSht.eachRow(async(row, rowNumber) => {    
            const parser = new Parser;
            parser.getStyle(row);
            parser.getSize(row);
            parser.getUnitPrice(row);
            if (row.values[1] === 'Quantity' && row.values[2] !== undefined) {
                if (row.values[2] !== undefined) {
                    for (let index = 2; index < 8; index++) {
                        if (row.values[index]) {
                            const newArr = [];
                            newArr.push(dataArray.sizes[index].split('/'));
                            dataFile.write(dataArray.style + "," + newArr[0][0]/10 + "," + newArr[0][1] + "," + row.values[index] + "," + dataArray.unitPrice + "\n");
                        }
                    }
                }
            }
        });

        callback(finalFileName);

    } catch (error) {
        console.log(error)
    }
}

class Parser {
    getStyle(row) {
        if (row.values[2] !== 'Stock No.' && row.values[1] === undefined) {
            if (row.values[2] !== undefined) {
                dataArray.style = row.values[2];
                return dataArray;
            }
        }
    }
    getSize(row) {
        if (row.values[1] === 'Plg_size/Plg' && row.values[2] !== undefined) {
            if (row.values[2] !== undefined) {
                for (let index = 2; index < 8; index++) {
                    if (row.values !== undefined) {
                        dataArray.sizes = row.values;
                        return dataArray;
                    }
                }
            }
        }
    }
    getUnitPrice(row) {
        if (row.values[8] !== 'Unit Price' && row.values[1] === undefined && row.values[7] !== undefined) {
            if (row.values) {
                dataArray.unitPrice = row.values[8];
                return dataArray;
            }
        }
    }
}

module.exports = sperryInvoiceParser;
