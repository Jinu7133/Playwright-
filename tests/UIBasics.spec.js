const {test,expect} = require("@playwright/test")
test.describe.configure({mode:'parallel'}) // how to run a test cases parallely in a single file
//older method of writing a test case
test('first playwright test',async function(){
    })
//new method 
test('Browser context playwright test', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com")
    console.log(await page.title())
    //Incorrect username and pwd
    await page.goto("https://www.saucedemo.com/")
    await page.locator("#user-name").fill("standarduser")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    console.log(await page.locator(".error-message-container.error").textContent()) // remove spaces and add dots 
    //conditional check to see if the error messages occurs 
    await expect(page.locator(".error-message-container.error")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    await expect(page.locator(".error-message-container.error")).toContainText("Epic sadface:")
    //correct username 
    const username = page.locator("#user-name")
    const login = page.locator("#login-button")
    const cardtitle = page.locator(".inventory_item_name")
    await username.fill(" ")// to correct wrong user name give space to make it empty
    await username.fill("standard_user")
    await login.click()
    console.log(await cardtitle.first().textContent())// to print first cardtitle printed
    console.log(await cardtitle.nth(1).textContent())// to print second cardttile printed
    console.log(await cardtitle.allTextContents())
    //await page.pause() // this code will not close the page until we close
})
// test case 2
test('Page context playwright test', async({page})=>{
    await page.goto("https://google.com")
    console.log(await page.title())
//asserations - are conditional checks, if it is true only TC will be passed
    await expect(page).toHaveTitle("Google")
})
// test case 3 - UI Controls
test('UI Controls',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    //checkbox demo
    await page.locator(".nav-item").nth(1).click()
    await page.locator(".list-group-item").nth(1).click()
    await page.locator("#gridCheck").check()
    await expect(page.locator("#gridCheck")).toBeChecked() // one way of writing asserations
    expect(await page.locator("#gridCheck").isChecked()).toBeTruthy() // another way of writing asserations
    //radio buttons demo
    await page.locator(".list-group-item").nth(2).click()
    await page.locator("#inlineRadio1").check()
    await expect(page.locator("#inlineRadio1")).toBeChecked()
    await page.locator("#inlineRadio24").check()
    expect(await page.locator("#inlineRadio24").isChecked()).toBeTruthy()
    //select input
    await page.locator("//a[normalize-space()='Select Input']").click() // used Xpath here (copied by using selector hub)
    await page.locator("#single-input-field").selectOption("Red")
    await expect(page.locator("#single-input-field")).toHaveValue("Red")
    //form submit
    await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.locator("#validationCustom01").fill("Jinu")
    await page.locator("#validationCustom02").fill("John")
    await page.locator("#validationCustomUsername").fill("JinuJohn")
    await page.locator("#validationCustom03").fill("Kochi")
    await page.locator("#validationCustom04").fill("Kerala")
    await page.locator("#validationCustom05").fill("695329")
    await page.locator("#invalidCheck").check()
    await page.locator(".btn.btn-primary").click()
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
    //Simple form Demo
    await page.locator(".list-group-item").first().click()
    await page.locator("#single-input-field").fill("Hello World")
    await page.locator("#button-one").click()
    await expect(page.locator("#message-one")).toHaveText("Your Message : Hello World")
   // await page.pause()
})
// test case 4- Child Window and new tab 
test('Child Window and New Tab',async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://www.github.com")
    const [newpage] = await Promise.all([ //to open new tab
        //Promise.all() is mainly used when you want to perform multiple asynchronous actions 
        // at the same time and wait until all of them are completed.
        context.waitForEvent('page'),
        page.evaluate(()=>window.open('https://google.com'))
    ])
    const newtab = await context.newPage()
    await newtab.goto("https://www.saucedemo.com") // 2 methods to open new tabs -windowopen and new tab
    console.log("New Tab and Child Window Opened Successfully")
    //await page.pause()
})
//Calendar Validation
const date = 12
const month = 11
test('Calendar Validation',async({page})=>{
await page.goto("https://selenium.qabible.in/index.php")
await page.locator(".nav-item").nth(2).click()
await page.locator(".list-group-item").nth(0).click()
await page.locator("#single-input-field").click()
await page.locator(".datepicker-days th.datepicker-switch").click()
await page.locator(".datepicker-months th.datepicker-switch").click()
const targetyear = 1997
while(true){ 
    const currentdecade = await page.locator(".datepicker-years th.datepicker-switch").textContent()
    const startdecade = parseInt(currentdecade.split('-')[0]) //converted into Integer and stored in startdecade so used parseInt
    if(targetyear>=startdecade && targetyear <=startdecade+9)
    {
        break
    }
    if (targetyear<startdecade)
    {
    await page.locator(".datepicker-years th.prev").click()
    }
    else
    {
     await page.locator(".datepicker-years th.next").click()
    }
}
await page.getByText(targetyear.toString(),{exact:true}).click()
await page.locator(".month").nth(month-1).click()
await page.getByText(date.toString(),{exact : true}).click()
//await page.pause()
})
//Codegen tools

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Jinu');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('John');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('3029');
  await page.locator('[data-test="postalCode"]').press('Tab');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});
// debug -npx playwright test UIBasics.spec.js --debug

//Special Locators

test('Special Locators',async({page})=>{
    await page.goto("https://selenium.qabible.in/radio-button-demo.php")
    await page.getByRole("link",{name : "Input Form"}).click() // for hyperlink and button we use getbyrole
    await page.getByRole("link",{name : "Checkbox Demo"}).click()
    await page.getByLabel("Click on this check box").check() //identifying the checkbox using the label text 
    await page.getByRole("link",{name: "Radio Buttons Demo"}).click()
    await page.getByLabel("45 to 60").check()
    await page.getByRole("link",{name: "Select Input"}).click()
    await page.getByLabel("Select Color").selectOption("Red")
    await page.getByRole("link",{name: "Form Submit", exact: true }).click()
    await page.getByPlaceholder("First name").fill("Jinu")
    await page.getByPlaceholder("Last name").fill("John")
    await page.getByPlaceholder("Username").fill("JinuJohn")
    await page.getByPlaceholder("City").fill("Kochi")
    await page.getByPlaceholder("State").fill("Kerala")
    await page.getByPlaceholder("Zip").fill("3029")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("button",{name :"Submit form"}).click()
    await expect(page.getByText("Form has been submitted successfully!")).toBeVisible()
    await page.getByRole("link",{name : "Simple Form Demo"}).click()
    await page.getByPlaceholder("Message").fill("Hello World")
    await page.getByRole("button",{name :"Show Message"}).click()
    await expect(page.getByText("Your Message : Hello World")).toBeVisible()
    //await page.pause()
})
//to run in UI format -npx playwright test --ui - to run each TC individually
//to debug -npx playwright test --debug


