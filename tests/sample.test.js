const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Green Kart Web Test', () => {
    let browser
    let page
    const url = 'https://rahulshettyacademy.com/seleniumPractise/#/'

    before(async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            devtools: false
        })

        page = await browser.newPage()       
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    it('End to End Test', async function() {
        await page.goto(url)
        await page.waitFor('.products-wrapper')
        await page.waitForSelector('.search-keyword')
        await page.type('.search-keyword', 'cucumber')
        
        // Option 1: using selector
        await page.waitForSelector('input.quantity')
        await page.$eval('input.quantity', el => el.value='')
        await page.type('input.quantity', '4')
        
        // Option 2: using xpath
        // await page.waitForXPath("//input[@class='quantity']")
        // await page.$eval('input[class="quantity"]', el => el.value='')
        // await page.$x("//input[@class='quantity']").then(txt => {
        //     txt[0].type('4')
        // })

        await page.waitForSelector('.decrement')
        await page.click('.decrement')
        await page.click('.increment')

        await page.$x("//button[contains(text(),'ADD TO CART')]")
            .then(el => {
                el[0].click()
            })
        
        await page.waitFor(1000)

        await page.$x("//a[@class='cart-icon']/img[@alt='Cart']")
            .then(el => {
                el[0].click()
            })

        await page.waitFor(1000)

        await page.$x("//button[contains(text(),'PROCEED TO CHECKOUT')]")
            .then(el => {
                el[0].click()
            })
        
        await page.waitFor(1000)

        await page.waitForSelector('.promoCode')
        await page.type('.promoCode', '123456')
        await page.click('.promoBtn')
        await page.waitFor(3000)

        await page.$x("//button[contains(text(),'Place Order')]")
            .then(el => {
                el[0].click()
            })
        await page.waitForSelector('.products-wrapper')
        await page.select('select', 'Australia')
        await page.waitFor(1000)
        await page.click('.chkAgree')
        await page.$x("//button[contains(text(),'Proceed')]")
            .then(el => {
                el[0].click()
            })

        await page.waitForSelector('div.wrapperTwo > span')
        const message = await page.$eval('div.wrapperTwo > span', el => el.innerText)
        expect(message).to.have.string('Thank you, your order has been placed successfully')

        // return to homepage
        await page.waitFor('.products-wrapper')
        await page.waitFor(2000)

    })
})