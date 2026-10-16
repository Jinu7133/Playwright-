const Exceljs = require('exceljs')
async function writeExcelFile() {
    const workbook = new Exceljs.Workbook()
    await workbook.xlsx.readFile("C:/Users/vkeap/Downloads/Obsqura Testing.xlsx")
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcelFile(worksheet)
    const cell = worksheet.getCell(output.row,output.col)
    cell.value = "Jinu Ann John" //changing name from Donna to Jinu
    await workbook.xlsx.writeFile("C:/Users/vkeap/Downloads/Obsqura Testing.xlsx") //change will be saved permantely

}
async function readExcelFile(worksheet) {
    let output = {row : -1,col : -1} 
    worksheet.eachRow((row,rownumber)=>{
        row.eachCell((cell,colnumber)=>{
         // console.log(cell.value)  
        if (cell.value === "Donna Snider"){
            output.row = rownumber
            output.col = colnumber
        } 
        })
    })
    return output
}
writeExcelFile()

