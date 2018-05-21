'use strict'

var Cart = require('../helpers/cart');
var Product = require('../models').product;

module.exports.addToCart = function(req, res, next){
    var idProduct = req.params.idProduct;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(idProduct).then(function(product) {
        if(product){
            // return res.status(200).send({product:product});
            cart.add(product, product.idProduct);
            req.session.cart = cart;
            req.session.save();
        } else{
            return res.send({message: "We currently don't have the specified product"});
        }
    })
}

module.exports.removeItem = function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeItem(productId);
    req.session.cart = cart;
    req.session.save();
    res.status(200).send({status: "You have successfully removed one item from the cart"});
}

module.exports.emptyCart = function(req, res, next){
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    // cart.emptyCart();
    // req.session.cart = cart;
    delete req.session.cart;
    req.session.save();
    res.status(200).send({status: "The cart is now empty"});
};
 
module.exports.checkout = function(req, res, next){
    if(!req.session.cart){
        return res.status(500).send({status: 'There are no products in the shopping cart'});
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

    if(products.length == 0){
        res.status(200).send({products: 'There are no products in the shopping cart', totalQuantity: totalQuantity, totalPrice: totalPrice});
    } else {
        res.status(200).send({products: products, totalQuantity: totalQuantity, totalPrice: totalPrice});
    }

}
 
  
  