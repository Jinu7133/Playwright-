const {test,expect} = require("@playwright/test");
test('@web Clientapp Login',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    await page.waitForLoadState('networkidle')
    await page.locator(".inventory_item_name").first().waitFor()
    console.log(await page.locator(".inventory_item_name").allTextContents())
    const product = page.locator(".inventory_item_name")
    const productname = "Sauce Labs Backpack"
    //const productname1= "Sauce Labs Bike Light"
    const count = await product.count()
    console.log(count)
    for(let i=0;i<count;i++)
    {
     if(await product.nth(i).textContent()===productname) //exactly the same
        {
         await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()
        } 
     /* if(await product.nth(i).textContent()===productname1) //exactly the same
        {
         await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()
        }  */     
    }
    await page.locator("#shopping_cart_container").click()
    //await expect(page.locator(".inventory_item_name")).toBeVisible()
    await expect(page.getByText("Sauce Labs Backpack", { exact: true })).toBeVisible()
    await page.locator("#checkout").click()
    await page.locator("#first-name").fill("Jinu")
    await page.locator("#last-name").fill("John")
    await page.locator("#postal-code").fill("3029")
    await page.locator("#continue").click()
    await page.locator(".inventory_item_name").waitFor()
    //await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99")
    console.log(await page.locator(".summary_subtotal_label").textContent())
    await page.locator("#finish").click()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
    //await page.pause()
})