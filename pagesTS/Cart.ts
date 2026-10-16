import { Locator, Page } from "@playwright/test"

const { expect } = require("@playwright/test")

export class Cart{
    page : Page
    item : Locator
    checkoutBtn : Locator
    constructor(page:Page){
    this.page = page
    this.item = page.locator(".inventory_item_name")
    this.checkoutBtn = page.locator("#checkout")
    }
 async validateCart(){
    await expect(this.item).toBeVisible()
 }   
 async clickCheckout(){
    await this.checkoutBtn.click()
 }
}
//module.exports = Cart