class Login{
    constructor(page){
        this.page = page
        this.username = page.locator("#user-name")
        this.password = page.locator("#password")
        this.loginbtn = page.locator("#login-button")
    }
    async goTo(){
    await this.page.goto("https://www.saucedemo.com")
    }
    async validLogin(username,password){
    await this.username.fill(username)
    await this.password.fill(password)
    await this.loginbtn.click()
    }

}
module.exports = Login
