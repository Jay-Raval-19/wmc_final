Project Documentation:
Link to Website:https://luxury-los-santos-frontend.onrender.com/

Name: GTA V Themed eCommerce Website
Description: An eCommerce platform themed around GTA V, offering high-end products like cars, penthouses, yachts, and planes. Features include user authentication(password,google), product management(wishlist,cart), shopping cart, and payment options(Stripe).
2. TechStack Used
Frontend:
React: For building the user interface.
React Router: For handling routing within the application.
CSS/SCSS: For styling.
Material-UI or Bootstrap: For UI components.
React-Native-Slick: For Carousels
Framer Motion: Making Complex Animations

Backend:
Node.js: Server-side JavaScript runtime.
Express: Web framework for Node.js.
MongoDB: NoSQL database for storing data.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
Firebase/Auth0: For user authentication.

Other Tools:
Axios: For making HTTP requests.
Webpack/Babel: For bundling and transpiling the code.
Render: For deployment.

Features Implemented
* Authentication(Password,Google Sign up/in)
* View Products(Shop Page)
* Category View(Cars,Yachts,Planes,Penthouses)
* Add to Cart
* Wishlist
* Product Page(Information about a Product's ingame stats)
* Product Filering(Based on PriceRange,Category,Seller) 
* Sell Product
* Update Username Password
* Payment Gateway
* Search Bar/Product Search Implementation

Installing Frontend:
Clone the Repository:
git clone https://github.com/Jay-Raval-19/wmc
Navigate to the Frontend Directory:

cd luxury_los-santos

Install Dependencies:
npm install
npm run build

Start the Development Server:
npm start

Installation(Backend):
*clone the repo:
git clone
*install dependencies
npm install
node index.js

Application Architecture
Frontend:

1. Home Page
Description: The landing page of your website.
Features:
Navbar: Includes links to all major pages (Home, About, Shop, View All Products, Profile, Cart, Wishlist, Login, Signup).
Hero Section: Eye-catching introduction with key information about your site or featured products.
Bestsellers: A section showcasing popular products or bestsellers with attractive visuals and links to their product pages.
Footer: Contains links to all major pages and additional information like contact details and social media links.
Design: Great UI with modern, responsive design that looks appealing on various devices.

2. About Page
Description: Provides information about your company or platform.
Features:
Company Overview: Details about the company's mission, values, and history.
Team Members: Introduce key team members or contributors with brief bios and photos.
Contact Information: Methods for users to get in touch with you.

3. Shop Page
Description: Displays products for sale.
Features:
Smart Product Display: Highlights best-selling products with attractive images and descriptions.
Product Cards: Each card includes a brief overview of the product, including price and a link to the product detail page.
Filters and Sorting: Options to filter products based on various criteria such as category and price range.

4. Product Page
Description: Detailed view of a single product.
Features:
Product Details: Comprehensive information about the product, including images, description, price, and stats.
Related Products: Recommendations for similar or complementary products that the user might be interested in.
Add to Cart: Option to add the product to the cart.
Reviews and Ratings: User reviews and ratings for the product (if applicable).

5. View All Products Page
Description: Displays all products with advanced filtering options.
Features:
Filter Options: Users can filter products based on price range, category, seller, and other criteria.
Sorting Options: Ability to sort products by price (high to low or low to high), popularity, or other attributes.
Product Listings: Grid or list view of all products matching the selected filters and sorting options.

6. Profile Page
Description: Allows users to manage their account settings.
Features:
Change Username: Option to update the username.
Change Password: Option to update the password with validation for security.
Profile Information: Display and edit other personal information such as email and profile picture.

7. Cart Page
Description: Shows items that the user has added to their cart.
Features:
Cart Items: List of products in the cart with quantities, prices, and options to modify or remove items.
Proceed to Payment: Integration with Stripe for payment processing.
Order Summary: Overview of total cost, shipping details, and payment options.
                                                               
8. Wishlist Page
Description: Displays products that the user has saved to their wishlist.
Features:
Wishlist Items: List of products with options to add them to the cart.
Move to Cart: Functionality to move items from the wishlist to the cart.
Remove from Wishlist: Option to remove items from the wishlist.
                                                               
9. Login Page
Description: Allows users to log in to their account.
Features:
Email and Password: Standard login form with validation.
Social Login: Options for logging in using Google or GitHub.
Forgot Password: Option to reset the password if forgotten.
                                                               
10. Signup Page
Description: Allows users to create a new account.
Features:
Email and Password: Standard registration form with password strength validation.
Social Signup: Options for signing up using Google or GitHub.
Profile Information: Option to provide additional details like display name and profile picture during registration.
Design and Usability
Responsive Design: The website adjusts to various screen sizes, ensuring a consistent user experience across devices (desktops, tablets, and mobile phones).
Modern UI: Clean, intuitive design with a focus on user experience and ease of navigation.
Accessibility: Consider accessibility best practices to ensure the site is usable by individuals with disabilities.
Each page and feature is designed to provide a seamless and engaging experience for users, whether they are browsing products, managing their account, or completing a purchase.

Backend:
1. /fetch-data (GET)
Description: Retrieves and categorizes items from the MongoDB database into four categories: cars, planes, yachts, and penthouses.
Process:
Connects to MongoDB and fetches all items from the items collection.
Iterates over the items and categorizes them based on their Category field.
Clears existing arrays (car, plane, yacht, penthouse) before populating them.
Sends a response containing the categorized items.

2. /insert-user-data (POST)
Description: Inserts new user data into the MongoDB database.
Process:
Extracts user data from the request body.
Inserts the user data into the users collection in MongoDB.
Sends a success message upon successful insertion.

3. /sign-in (POST)
Description: Authenticates a user with their email and password.
Process:
Extracts email and password from the request body.
Finds the user in the users collection by email.
Compares the provided password with the hashed password stored in the database using bcrypt.
Sends a success message if authentication is successful, otherwise returns a 401 error for invalid credentials.

4. /sign-up (POST)
Description: Registers a new user with email, password, display name, and profile picture.
Process:
Extracts email, password, display name, and image URL from the request body.
Hashes the password using bcrypt.
Creates a new user object with default values and the hashed password.
Inserts the new user into the users collection.
Sends a success message with the user data.

5. /add-to-cart (POST)
Description: Adds an item to the user's cart.
Process:
Extracts user ID and item ID from the request body.
Finds the item in the items collection by its ID.
Updates the user's document in the users collection to include the item in their cart.
Sends a success message.

6. /add-to-wishlist (POST)
Description: Adds an item to the user's wishlist.
Process:
Extracts user ID and item ID from the request body.
Finds the item in the items collection by its ID.
Updates the user's document in the users collection to include the item in their wishlist.
Sends a success message.

7. /get-cart (GET)
Description: Retrieves the items in the user's cart.
Process:
Extracts user ID from the query parameters.
Finds the user in the users collection by email and retrieves their cart items.
Sends the cart data as a response or a 404 error if no cart is found.

8. /get-wishlist (GET)
Description: Retrieves the items in the user's wishlist.
Process:
Extracts user ID from the query parameters.
Finds the user in the users collection by email and retrieves their wishlist items.
Sends the wishlist data as a response or a 404 error if no wishlist is found.

9. /remove-item-from-cart (DELETE)
Description: Removes an item from the user's cart.
Process:
Extracts user ID and item ID from the request body.
Updates the user's document in the users collection to remove the item from their cart.
Sends a success message.

10. /remove-item-from-wishlist (DELETE)
Description: Removes an item from the user's wishlist.
Process:
Extracts user ID and item ID from the request body.
Updates the user's document in the users collection to remove the item from their wishlist.
Sends a success message.

11. /move-wishlist-to-cart (POST)
Description: Moves an item from the user's wishlist to their cart.
Process:
Extracts user ID and item ID from the request body.
Finds the item in the items collection by its ID.
Updates the user's document in the users collection by:
Removing the item from the wishlist.
Adding the item to the cart.
Sends a success message.

Additional Notes:
Security Considerations: Ensured that sensitive data, such as user passwords, is properly secured using hashing (e.g., bcrypt) and that authentication tokens are used where necessary.
Error Handling: Proper error handling is in place, logging errors to the console and sending appropriate HTTP status codes.
Environment Variables: MongoDB URI and other sensitive information are managed using environment variables, which should be kept secure.
Overall, the endpoints cover a range of functionalities required for an eCommerce platform, including user authentication, cart and wishlist management, and data retrieval.

Database Schema:
Gta_list(Database)
        items(collection)  ==> contains product data of all products
        users(collection)  ==> created on signup, contains user data like email,name,carts(array),wishlists(array),pfp(profile pic) etc
          
  Project Team:
                                                               Jay Raval
                                                               Jinil Saval






