const { test,expect } = require("@playwright/test");

test('Popup Validations',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:'Alerts and Modals'}).click()
    await page.getByRole("link",{name:'Javascript Alert'}).click()
    //dialog box code
    page.on('dialog',async dialog=>{ //very important//
        await page.waitForTimeout(3000)
        await dialog.accept() //to cancel -dialog.dismiss()
    })
    await page.locator(".btn.btn-warning").click()
    await page.getByRole("link",{name : 'Others'}).hover() //to highlight
    //iFrames 
    await page.goto("https://demoqa.com/frames")
    const framepage = page.frameLocator("#frame1")
    console.log(await framepage.locator("#sampleHeading").textContent())
    await expect(framepage.locator("#sampleHeading")).toHaveText("This is a sample page")
    //await page.pause()
})
//Screenshots
test('Screenshots',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await page.locator(".error-message-container.error").screenshot({path:'error.png'}) //will be saved directly in playwright
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.screenshot({path:'error1.png'}) // will take the screenshot of the entire screen
})
//Visual Comparison
test('Visual Comparison',async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    expect(await page.screenshot()).toMatchSnapshot('saucedemo.png')//firt time error will come, on failing screesnhot will be generated and then from second run it will compare
})
