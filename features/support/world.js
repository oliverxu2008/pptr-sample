// https://github.com/spirosikmd/cucumber-puppeteer-example

const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

const config = require('../../lib/config')

// destructuring from the required module
const { click, clickX, clrText, typeText, typeTextX } = require('../../lib/helpers')
const { generateID, generateEmail, generateNumber} = require('../../lib/utils')

setDefaultTimeout(30 * 1000);

class CustomWorld {
    async launchBrowser() {
        this.browser = await puppeteer.launch( { 
            headless: config.isHeadless,
            slowMo : config.slowMo,
            devtools: config.isDevtools
        });
        this.page = await this.browser.newPage();
        await this.page.setDefaultTimeout(config.waitingTimeout);
        await this.page.setDefaultNavigationTimeout(config.navigationTimeout);
    }

    async closeBrowser() {
        this.browser.close();
    }

    async openLandingPage() {
        await this.page.goto(config.baseUrl);
        await this.page.waitFor('.products-wrapper');
    }

    async searchVegi(name) {
        await typeText(this.page, '.search-keyword', name);
    }

    async setKilogramForVegi(kilogram) {
        await clrText(this.page, 'input.quantity');
        await typeText(this.page, 'input.quantity', kilogram);
    }

    async user_clicks_increase_to_add_one_kg() {
        await this.page.click('.increment');
    }

    async user_clicks_decrease_to_remove_one_kg() {
        await this.page.click('.decrement');
    }

    async user_clicks_button_something(btnName) {
        const xpath = `//button[contains(text(),'${btnName}')]`;
        await clickX(this.page, xpath);
        // await this.page.waitFor(5000);
    }

    async user_clicks_shopping_cart() {
        await clickX(this.page, "//a[@class='cart-icon']/img[@alt='Cart']");
    }

    async user_enters_promotion_code(promotioncode) {
        await typeText(this.page, '.promoCode', promotioncode);
    }

    async user_selects_country(country) {
        await this.page.waitForSelector('select');
        await this.page.select('select', country);
    }

    async user_ticks_terms_then_conditions() {
        await click(this.page, '.chkAgree');
    }

    async user_was_navigated_to_final_confirmation_page_with_text_something(message) {
        await this.page.waitForSelector('div.wrapperTwo > span');
        const messageResult = await this.page.$eval('div.wrapperTwo > span', el => el.innerText);
        expect(messageResult).to.have.string(message);
    }

    async user_was_navigated_to_greencart_landing_page() {
        await this.page.waitFor('.products-wrapper');
    }
}

setWorldConstructor(CustomWorld);