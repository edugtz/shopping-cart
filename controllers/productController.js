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

/**
*  This function calls the product model and creates a new product in the database
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.createProduct = function(req, res, next){
    var code = req.body.code;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;

    if(!code){
        return res.status(422).send({message: 'You must enter a code'});
    }
    if(!name){
        return res.status(422).send({message: 'You must enter a name'});
    }
    if(!description){
        return res.status(422).send({message: 'You must enter a description'});
    }
    if(!price){
        return res.status(422).send({message: 'You must enter a price'});
    }
    
    Product.create({code: code, name: name, description: description, price:price}).then(function(product) {
        if(product){
            return res.status(200).send({message: 'The product was successfully created'});
        } else{
            return res.send({message: "An error has occurred"});
        }
    });
}

/**
*  This function calls the product model and deletes the specified product
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.deleteProduct = function(req, res, next){
   
    var idProduct = req.params.idProduct;
    
    if(!idProduct){
        return res.status(422).send({message: 'You must send an idProduct'});
    }
   
    Product.destroy({
        where: {
           idProduct: idProduct
        }
    }).then(function(deleted) {
        if(deleted == 1){
            return res.status(200).send({message: 'The product was successfully deleted'});
        } else{
            return res.send({message: "An error has occurred"});
        }
    });
}

/**
*  This function calls the product model and updates the specified product
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
module.exports.updateProduct = function(req, res, next){
   
    var idProduct = req.params.idProduct;
    var newData = {}
    newData.name = req.body.name;
    newData.code = req.body.code;
    newData.description = req.body.description;
    newData.price = req.body.price;
   
    Product.update(newData, {where: { idProduct: idProduct } }).then(function(updated) {
        if(updated == 1){
            return res.status(200).send({message: 'The product was successfully updated'});
        } else{
            return res.send({message: "An error has occurred"});
        }
    });
}