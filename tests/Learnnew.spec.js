/* const{test,expect} = require("@playwright/test")
const Exceljs = require('exceljs')
test('Open Amazon', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.com.au/");
    console.log(await page.title())
    const TodayLink = page.getByRole('link',{name: "Today's Deals"}).first();
    await TodayLink.click();
    await page.pause()    
}
)
// Ajax form submit & Jquery Select2 test case
test.only('Ajax form submit',async({page})=>{
    await page.goto("https://selenium.qabible.in/ajax-form-submit.php")
    await page.locator("//a[normalize-space()='Ajax Form Submit']").click()
    await page.locator("#subject").fill("Check")
    await page.locator("#description").fill("Hello World")
    await page.locator(".btn.btn-primary").click()
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
    await page.locator("//a[normalize-space()='Jquery Select2']").click()
    const singleSelect = page.locator('.select2-selection--single').first();
    await singleSelect.click();
    await page.getByRole('option', { name: 'Hawaii', exact: true }).click();
    const multiSelect = page.locator('.select2-selection--multiple');
    await multiSelect.click();
    await page.getByRole('option', { name: 'Hawaii' }).click();
    await multiSelect.click();
    await page.getByRole('option', { name: 'California' }).click();
    const singleSelect1 = page.locator('.select2-selection--single').nth(1);
    await singleSelect1.click();
    await page.getByRole('option', { name: 'Oregon', exact: true }).click();
    await page.pause()  
})
//ListBox 
test('test', async ({ page }) => {
  await page.goto('https://selenium.qabible.in/bootstrap-dual-list.php');
  await page.locator('[id="bootstrap-duallistbox-nonselected-list_duallistbox_demo1[]"]').selectOption('option1');
  await page.locator('[id="bootstrap-duallistbox-selected-list_duallistbox_demo1[]"]').selectOption('option3');
  await page.locator('[id="bootstrap-duallistbox-nonselected-list_duallistbox_demo1[]"]').selectOption('option2');
  page.on('dialog',async dialog=>{ //very important//
        await page.waitForTimeout(3000)
        await dialog.accept() //to cancel -dialog.dismiss()
    })
  await page.getByRole('button', { name: 'Submit data' }).click();
  await page.pause()
})
*/