Feature: Search and place order for Vegetables
As a user I can search and place order successfully for vegetables
@SmokeTest
  Scenario Outline: Select items and place an order
    Given User is on Greencart Landing page
     When User searches <Name> Vegetable
     Then User sets <Kilogram> Kg
     Then User clicks increase to add one Kg
     Then User clicks decrease to remove one Kg
     Then User clicks button "ADD TO CART"
     Then User clicks shopping cart
     Then User clicks button "PROCEED TO CHECKOUT"
     Then User enters promotion code <PromotionCode> 
     Then User clicks button "Apply"
     Then User clicks button "Place Order"
     Then User selects country <Country>
     Then User ticks Terms Then Conditions
     Then User clicks button "Proceed"
     Then User was navigated to final confirmation page with text "your order has been placed successfully"
     Then User was navigated to Greencart Landing page
  
    Examples: 
      | Name     | Kilogram | PromotionCode | Country   | 
      | Beans    | 2        | 484723444     | India     | 
      | Cucumber | 4        | 123456        | Australia | 
      | Carrot   | 3        | 789692        | China     | 
