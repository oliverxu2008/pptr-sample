module.exports = {
    click: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },
    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector, element => element.innerText)
        } catch (error) {
            throw new Error(`Cannot get text from selector: ${selector}`)
        }
    },
    clrText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.$eval(selector, el => el.value='')
        } catch(error) {
            throw new Error(`Could not clear value of selector: ${selector}`)
        }
    },
    typeText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch(error) {
            throw new Error(`Could not type into selector: ${selector}`)
        }
    },
    waitForText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text), 
                {},
                selector,
                text
            })
        } catch(error) {
            throw new Error(`Text: ${text} not found for selector: ${selector}`)
        }
    },
    shouldNotExist: async function(page, selector) {
        try {
            await page.waitForSelector(selector, { 
                hidden: true,
                timeout: 3000
            })
        } catch (error) {
            throw new Error(`Selector: ${selector} is visible, but should not be.`)
        }
    },
    clickX: async function(page, xpath) {
        try {
            await page.$x(xpath)
            .then(el => {
                el[0].click()
            })
        } catch (error) {
            throw new Error(`Could not click on xpath: ${xpath}`)
        }
    },
    typeTextX: async function(page, xpath, text) {
        try {
            await page.$x(xpath)
            .then(el => {
                el[0].type(text)
            })
        } catch(error) {
            throw new Error(`Could not type into xpath: ${xpath}`)
        }
    },
    pressKey: async function(page, key) {
        try {
            await page.keyboard.press(key)
        } catch(error) {
            throw new Error(`Could not press key: ${key} on the keyboard`)
        }
    }
}