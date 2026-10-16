const {devices} = require("@playwright/test")
const { permission } = require("node:process")
const config = ({
  testDir : './tests',
  retries : 1,
  workers : 4,
  timeout : 60*1000,//40sec - after 40 sec only report will be generated
  expect : {
    timeout : 60*1000 //report generation time if failed
} ,
reporter : 'html',
projects : [
  {
    name : 'Safari',
use : {
  browserName : 'webkit',
  headless : true, // to open browser 
  screenshot : 'only-on-failure',
  video : 'off',
  trace : 'on' 
}},
  {
    name : 'Chrome',
use : {
  browserName : 'chromium',
  headless : false, // to open browser 
  screenshot : 'on',
  video : 'retain-on-failure',
  trace : 'on-first-retry',
  //viewport : {width :720, height : 720},
//...devices["iPhone 11"],
ignoreHttpsErrors : true,
Permissions : ['geolocation'],// this allows the site to know our locations

}},
]
})
module.exports = config