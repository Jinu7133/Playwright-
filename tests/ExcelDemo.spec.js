const { test,expect } = require('@playwright/test');
const Exceljs = require('exceljs')
const path = require('path');
const os = require('os');

test('Excel download', async ({ page }) => {
  await page.goto('https://selenium.qabible.in/');
  await page.getByRole('link', { name: 'Table', exact: true }).click();
  await page.getByRole('link', { name: 'Table Data Download' }).click();
const [download] = await Promise.all([ //Take the download result and store it in a variable called download
  page.waitForEvent('download'),//Playwright, wait for a download to happen
  page.getByRole('button', { name: 'Excel' }).click(),
  ]);
  const filePath = path.join(os.homedir(), 'Downloads', 'Obsqura Testing.xlsx');
  await download.saveAs(filePath);// saves to the mentioned path
  console.log('Saved to:', filePath);
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
  //Upload file
  await page.goto('https://the-internet.herokuapp.com/upload');
  await page.locator('#file-upload').setInputFiles('C:/Users/vkeap/Downloads/Obsqura Testing.xlsx');
  await page.locator("#file-submit").click()
  await expect(page.getByText("File Uploaded!")).toBeVisible()
 // await page.pause()
});