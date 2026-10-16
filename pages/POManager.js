const Cart = require("./Cart")
const Dashboard = require("./Dashboard")
const Login = require("./Login")
const ShippingDetails = require("./ShippingDetails")
const Summary = require("./Summary")

class POManager{
    constructor(page){
      this.page = page
      this.login = new Login(page)
      this.dashboard = new Dashboard(page)
      this.cart = new Cart(page)
      this.shipping = new ShippingDetails(page)
      this.summary = new Summary(page)
    }
   getLogin(){
    return this.login
   } 
   getDashboard(){
    return this.dashboard
   }
   getCart(){
    return this.cart
   }
   getShippingDetails(){
    return this.shipping
   }
   getSummary(){
    return this.summary
   }
}
module.exports = POManager