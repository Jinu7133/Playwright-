import { Locator, Page } from "@playwright/test"

export class Summary{
    page : Page
    item : Locator
    subtotal : Locator
    finishbtn : Locator
    constructor(page :Page){
        this.page = page
        this.item = page.locator(".inventory_item_name")
        this.subtotal =page.locator(".summary_subtotal_label")
        this.finishbtn = page.locator("#finish")
    }
   async validateSummary(){
    await this.item.waitFor()
    console.log(await this.subtotal.textContent())
   }
   async clickFinish(){
    await this.finishbtn.click()
   }
}
//module.exports = Summary