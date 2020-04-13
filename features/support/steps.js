const { Given, When, Then, Before, After } = require('cucumber');

Before(async function() {
    return await this.launchBrowser();
});

After(async function() {
    return await this.closeBrowser();
});

Given(/^User is on Greencart Landing page$/, async function () {
    return await this.openLandingPage();
});

When(/^User searches (.+) Vegetable$/, async function (name) {
    return await this.searchVegi(name);
});

Then(/^User sets (.+) Kg$/, async function (kilogram) {
    return await this.setKilogramForVegi(kilogram);
});

Then(/^User clicks increase to add one Kg$/, async function () {
    return await this.user_clicks_increase_to_add_one_kg();
});

Then(/^User clicks decrease to remove one Kg$/, async function () {
    return await this.user_clicks_decrease_to_remove_one_kg();
});

Then(/^User clicks button \"([^\"]*)\"$/, async function (addtocart) {
    return await this.user_clicks_button_something(addtocart);
});

Then(/^User clicks shopping cart$/, async function () {
    return await this.user_clicks_shopping_cart();
});

Then(/^User enters promotion code (.+)$/, async function (promotioncode) {
    return await this.user_enters_promotion_code(promotioncode);
});

Then(/^User selects country (.+)$/, async function (country) {
    return await this.user_selects_country(country);
});

Then(/^User ticks Terms Then Conditions$/, async function () {
    return await this.user_ticks_terms_then_conditions();
});

Then(/^User was navigated to final confirmation page with text \"([^\"]*)\"$/, async function (message) {
    return await this.user_was_navigated_to_final_confirmation_page_with_text_something(message);
});

Then(/^User was navigated to Greencart Landing page$/, async function () {
    return await this.user_was_navigated_to_greencart_landing_page();
});

