const { expect } = require('@playwright/test');
let { setDefaultTimeout } = require('@cucumber/cucumber')
const path = require('path');
setDefaultTimeout(60 * 15000)

require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

class LoginPage {

    async navigate() {
        await global.page.goto(process.env.WEB_URL,)
    }

    async enterUsername() {
        await global.page.locator('(//span[text()="Email Address / Login Id: "]/following::input)[1]').waitFor({ status: 'visible', setTimeout: 20000 })
        await global.page.locator('(//span[text()="Email Address / Login Id: "]/following::input)[1]').fill(process.env.WEB_USERNAME)
    }

    async enterPassword() {
        await global.page.locator('(//input[@type="password"])[2]').fill(process.env.WEB_PASSWORD)
    }

    async clickOnLoginButton() {
        await global.page.locator('(//input[@value="Login"])[2]').click()
    }

    async verifyDashboardURL() {
        expect(await global.page.url()).toEqual('https://www.testyou.in/Login.aspx')
    }
}

module.exports = { LoginPage }