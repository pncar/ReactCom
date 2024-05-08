# React e-Commerce
Simple react-based e-Commerce which allows the user to search for products and view product details, as well as accessing the product's seller profile and find other products by the same offerer. Based on a previous project I made last year, in this case I also implemented TypeScript and centralized the app's logic using Redux. It also handles some small local storage settings like dark mode on/off.
The app allows the user to modify it's basic data and add products to a cart, which also counts how many products are present and the total price. It also handles discounts on the products which have them.

For simplicity I used [json-server](https://www.npmjs.com/package/json-server) to create a mockup server from which products/users are retrieved.

## Tools used
- React
- Redux
- TailwindCSS
- Axios
- react-router-dom
- Vite
- TypeScript
- NodeJS and json-server for mockup "server"

## How to run
1. Create an empty folder to store the project
2. Go to the folder created and clone the repository https://github.com/pncar/ReactCom `git clone https://github.com/pncar/ReactCom.git`, or download the content from this repository as zip
3. Go to the frontend/redux-store or frontend -> redux-store folder, and run `npm run dev`
4. On the server_node folder run `npx json-server myserv.json`
5. Check the .env file and make sure the VITE_API_URL coincides with the port the mockup server is running `VITE_API_URL=http://localhost:3000`

## Future
There are many things that I'd like to improve. Many features were present in the original app I made.
- Move from a 'mockup' server and provide a more realistic backend logic
- Internationalization
- Display of different currencies
- Full "life cycle" of an order, from adding products to a cart to handling the customer's data like credit card and user information and completing the order.

  
