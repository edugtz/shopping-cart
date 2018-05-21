'use strict'

var Product = require('../models').product;

/**
*  This calls the product model and retrieves a list of all products
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.list = function(req, res, next){
    Product.findAll().then(function(products) {
        if(products){
            return res.status(200).send({products:products});
        } else{
            return res.send({message: "We currently have no products in stock"});
        }
    })
}

/**
*  This function calls the product model and retrieves an specific product
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.product = function(req, res, next){
    Product.findOne({where: {idProduct:req.params.idProduct}}).then(function(product) {
        if(product){
            return res.status(200).send({product:product});
        } else{
            return res.send({message: "We currently don't have the specified product"});
        }
    })
}
