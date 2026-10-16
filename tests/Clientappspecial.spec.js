const {test,expect} = require("@playwright/test");
test('@web Special Locators',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByText("Login").click()
    await page.waitForLoadState('networkidle')
    await page.getByText("Sauce Labs Backpack").first().waitFor()
    console.log(await page.locator(".inventory_item_name").allTextContents())
    const product = page.locator(".inventory_item_name")
    const productname = "Sauce Labs Backpack" 
    const count = await product.count()
    console.log(count)
    for(let i=0;i<count;i++)
    {
     if(await product.nth(i).textContent()===productname) //exactly the same
        {
         await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()
        }    
    }
    await page.getByText("Add to cart").click
    await page.getByRole('button', { name: /Cart/ }).click(); //no need to use special locators
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()   
    await page.getByRole('button',{name : 'Checkout'}).click()
    await page.getByPlaceholder("First Name").fill("Jinu")
    await page.getByPlaceholder("Last Name").fill("John")
    await page.getByPlaceholder("Zip/Postal Code").fill("3029")
    await page.getByRole('button', {name :'continue'}).click()
    await expect(page.getByText("Item total: $29.99", { exact: true })).toBeVisible();
    await page.getByRole('button',{name : 'finish'}).click()
    //await expect(page.getByLabel('Back Home')).toBeVisible
    //await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText("Thank you for your order!")).toBeVisible()
   // await page.pause()
   
})