class ShippingDetails{
    constructor(page){
        this.page = page
        this.firstname =page.locator("#first-name")
        this.lastname =page.locator("#last-name")
        this.pin =page.locator("#postal-code")
        this.continuebtn = page.locator("#continue")
    }
   async enterUserDetails(fname,lname,pin){
    await this.firstname.fill(fname)
    await this.lastname.fill(lname)
    await this.pin.fill(pin)
   } 
   async clickContinue(){
    await this.continuebtn.click()
   }
}
module.exports = ShippingDetails