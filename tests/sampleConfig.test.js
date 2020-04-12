// Same test automation scenario, however with integration to configuration, helper, etc

const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../lib/config')

// destructuring from the required module
const { click, clickX, clrText, typeText, typeTextX } = require('../lib/helpers')
const { generateID, generateEmail, generateNumber} = require('../lib/utils')

describe('Green Kart Web End to End Test', () => {
    let browser
    let page
    const baseUrl = config.baseUrl

    before(async function() {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools
        })

        page = await browser.newPage()       
        await page.setDefaultTimeout(config.waitingTimeout)
        await page.setDefaultNavigationTimeout(config.navigationTimeout)
    })

    after(async function() {
        await browser.close()
    })

    it('should be able to buy vegitable', async function() {
        await page.goto(baseUrl)
        await page.waitFor('.products-wrapper')
        await typeText(page, '.search-keyword', 'cucumber')
        
        // Option 1: using selector
        await clrText(page, 'input.quantity')
        await typeText(page, 'input.quantity', '4')

        await click(page, '.decrement')
        await click(page, '.increment')
        
        await clickX(page, "//button[contains(text(),'ADD TO CART')]")
        await clickX(page, "//a[@class='cart-icon']/img[@alt='Cart']")
        await clickX(page, "//button[contains(text(),'PROCEED TO CHECKOUT')]")

        await typeText(page, '.promoCode', generateID(10))
        await clrText(page, '.promoCode')
        await typeText(page, '.promoCode', generateEmail())
        await clrText(page, '.promoCode')
        await typeText(page, '.promoCode', generateNumber())
        await click(page, '.promoBtn')
        await page.waitFor(3000)
        await clickX(page, "//button[contains(text(),'Place Order')]")

        await page.waitForSelector('.products-wrapper')
        await page.select('select', 'Australia')
        await click(page, '.chkAgree')
        await clickX(page, "//button[contains(text(),'Proceed')]")
        
        await page.waitForSelector('div.wrapperTwo > span')
        const message = await page.$eval('div.wrapperTwo > span', el => el.innerText)
        expect(message).to.have.string('Thank you, your order has been placed successfully')

        // return to homepage
        await page.waitFor('.products-wrapper')
        await page.waitFor(2000) 
    })
})