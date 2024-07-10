# DCIT202 ASSIGNMENT 7

## 11042928


### Components

1. **HomeScreen**
   - Displays available products fetched from an [external API](https://fakestoreapi.com).
.
   - Each `Product` includes an image, name, price, and an add-to-cart button.

2. **Product**
   - Handles informmation displayed on each product in the `HomeScreen`

3. **ProductDetailScreen**
   - Displays detailed information about a selected product, including its image, name, description, and price.

4. **CartScreen**
   - Displays selected items in the cart.
   - Each cart item includes an image, name, price, quantity, and a remove-from-cart button.
   - There is a checkout button at the end of the `CartScreen`

5. **Menu**
   - It is displayed when the user clicks on the menu button on the left of the app's header


### Data Storage 



### Implementation Approach
- **Local Storage**: Using `AsyncStorage` to store selected items locally on the device ensures that the cart persists across app sessions.

- **Fetching from API**: Using `Fetch API` to fetch from the [external API](https://fakestoreapi.com), all the product information gets displayed from that API.

### Screenshots 
#### HomeScreen

![HomeScreen](my-app\assets\screenshots\s1.png)

#### Product Details

![Product Details](my-app\assets\screenshots\s1.png)

#### Menu

![Menu](my-app\assets\screenshots\s1.png)

#### CartScreen

![CartScreen](my-app\assets\screenshots\s1.png)

---