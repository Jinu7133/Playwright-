const base = require("@playwright/test")
exports.customtest = base.test.extend({
testDataForOrder :  {
    username : "standard_user",
    password : "secret_sauce",
    productname : "Sauce Labs Backpack"
}
})