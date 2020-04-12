// https://github.com/spirosikmd/cucumber-puppeteer-example

const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

setDefaultTimeout(30 * 1000);

class CustomWorld {
    async launchBrowser() {
        this.browser = await puppeteer.launch( { headless: false });
        this.page = await this.browser.newPage();
    }

    async closeBrowser() {
        this.browser.close();
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/login.html');
    }

    async fillLoginForm() {
        await this.page.waitForSelector("#login_form");
        await this.page.type('#user_login', 'username');
        await this.page.type('#user_password', 'password');
    }

    async submitLogin() {
        await this.page.click('.btn-primary');
    }

    async verifySuccessfulLogin() {
        await this.page.waitForSelector('.nav-tabs');
    }
}

setWorldConstructor(CustomWorld);