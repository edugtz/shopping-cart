# Node.js - Shopping cart
# Installation steps

**1. Clone or pull the repository to your computer**
```
git clone https://eduardo2325@bitbucket.org/eduardo2325/shopping-cart.git
```
or
```
git init
git remote add origin https://eduardo2325@bitbucket.org/eduardo2325/shopping-cart.git
git pull origin master```
```
**2. Install sequelize-cli to be able to run commands for the database**
##### Globally
Install CLI globally with

```
npm install -g sequelize-cli
```

Now you can run CLI using following command anywhere

```
$ sequelize
```

##### Locally
Install CLI locally to your `node_modules` folder with

```
$ npm install --save sequelize-cli
```

You should be able to run CLI with

```bash
$ node_modules/.bin/sequelize
```
**3. Install necessary dependencies**
```
    npm install 
```
**4. In the root of the project folder we have to run the following commands to create the database, models and populate the database**

 This will create the database based in the configuration in config/config.js in our project files
```
sequelize db:create
```
Then we will migrate the corresponding models and create their tables in the database
```
sequelize db:migrate
```

And finally populate the products and users tables that we need for our application
```
sequelize db:seed:all
```
or we would like to revert the process we can do it with
```
sequelize db:seed:undo:all
```

**5. Finally but most importantly**
We can run all the tests in the application by running
```
npm test
```
## Test the API
_We can use any of the following commands_
```
npm start
```
or if we don't want to be restarting the server manually everytime
```
nodemon
```

**The application will start running on [http://localhost:8080](http://localhost:8080)**

## Route list
#### POST /signup/
Create a new user account
Example: http://localhost:8080/signup

#### POST /signin/
Sign in with a given username and password
Example: http://localhost:8080/signin

#### GET /logout/
Close current session
Example: http://localhost:8080/logout

#### GET /profile/
It prints a welcome message to the current user
Example: http://localhost:8080/profile

#### GET /checkauth/
Checks if a user has an active session and is authenticated
Example: http://localhost:8080/checkauth

#### GET /products/
List of products
Example: http://localhost:8080/products

#### GET /products/:id
Specific product by a given id
Example: http://localhost:8080/products/1

#### POST /products/
Creates a new product and expects a code, name, description and price to be sent with the request
Example: http://localhost:8080/products

#### DELETE /products/:id
Deletes an specific product by a given id
Example: http://localhost:8080/products/1

#### PUT /products/:id
Updates an specific product by a given id
Example: http://localhost:8080/products/1

#### GET /cart/add-to-cart/:id
Adds a product to the shopping cart
Example: http://localhost:8080/cart/add-to-cart/1

#### GET /cart/remove/:id
Removes a product from the shopping cart
Example: http://localhost:8080/cart/remove/1

#### GET /cart/checkout/
It shows the summary of the products that were added to the shopping cart
Example: http://localhost:8080/cart/checkout

#### GET /cart/add-to-cart/:id
Empties the shopping cart
Example: http://localhost:8080/cart/empty-cart


