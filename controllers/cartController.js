'use strict'

var Cart = require('../helpers/cart');
var Product = require('../models').product;

/**
*  This function add an specific product to the shopping cart
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.addToCart = function(req, res, next){
    var idProduct = req.params.idProduct;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(idProduct).then(function(product) {
        if(product){
            cart.add(product, product.idProduct);
            req.session.cart = cart;
            req.session.save();
            return res.status(200).send({message: "Product added to the cart"});

        } else{
            return res.status(404).send({message: "We currently don't have the specified product"});
        }
    })
}

/**
*  This function removes an specific product from the shopping cart
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.removeItem = function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    if(!req.session.cart){
        return res.status(500).send({message: 'The shopping cart is empty'});
    } else {
        cart.remove(productId);
        req.session.cart = cart;

        if(req.session.cart.totalQty == 0){
            delete req.session.cart;
        }
        req.session.save();
        res.status(200).send({message: "You have successfully removed one item from the cart"});
    }
}

/**
*  This function empties the shopping cart
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.emptyCart = function(req, res, next){
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    delete req.session.cart;
    req.session.save();

    res.status(200).send({message: "The cart is now empty"});
};
 
/**
*  This function shows what we currently have in our shopping cart as a summary
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.checkout = function(req, res, next){
    if(!req.session.cart){
        return res.status(500).send({message: 'There are no products in the shopping cart'});
    }
    var cart = new Cart(req.session.cart);
    var totalPrice = 0;
    var totalQuantity = 0;
    var products = Array();
    var aux = 0;

    var items = cart.getItems();
    var totalQuantity = cart.totalQty;
    items.forEach(function(value, index){
        var product = {};

        product.name = value.item.code;
        product.description = value.item.description;
        product.quantity = value.qty;
        // products.individualTotal = value.price;
        if(value.item.code == 'TSHIRT' && value.qty >= 3){
            aux = (19.00 * value.qty);
        } else {
            aux = (value.item.price * value.qty);
        }
        totalPrice = totalPrice + aux;
        product.individualTotal = aux;
        product.individualTotal = parseFloat(product.individualTotal).toFixed(2);
        products.push(product);
    });
    totalPrice = parseFloat(totalPrice).toFixed(2);

    if(products.length != 0){
        res.status(200).send({products: products, totalQuantity: totalQuantity, totalPrice: totalPrice});
    }

}
 
  
  